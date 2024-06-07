import React, { useState, useEffect } from 'react';
// import { SaucesList } from './SaucesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [items, setItems] = useState([]);
	const [currentItem, setCurrentItems] = useState(null);
    const [isFormShowing, setIsFormShowing] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [category, setCategory] = useState("");
	const [image, setImage] = useState("");

	const [query, setQuery] = useState('');
	const [filteredItems, setFilteredItems] = useState([]);

	const [updatedName, setUpdatedName] = useState("");
	const [updatedDescription, setUpdatedDescription] = useState("");
	const [updatedPrice, setUpdatedPrice] = useState(0);
	const [updatedCategory, setUpdatedCategory] = useState("");
	const [updatedImage, setUpdatedImage] = useState("");

	const[key, setKey] = useState(0)
	
	useEffect(() => {
		async function fetchItems(){
			try {
				const response = await fetch(`${apiURL}/items`);
				const itemsData = await response.json();
				setItems(itemsData);
				setFilteredItems(itemsData); // Initialize filtered items with all items
			} catch (err) {
				console.log("Oh no an error! ", err)
			}
		}

		fetchItems();
	}, []);

    useEffect(() => {
        // Filter items based on the search query
        const filtered = items.filter((item) =>
            item && item.name && item.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredItems(filtered);
    }, [query, items, key]);
	
	

	async function addItem(event) {
		event.preventDefault();
		const response = await fetch(`${apiURL}/items`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, description, price, category, image }),
		});
		if (response.ok) {
			const newItem = await response.json();
			setItems([...items, newItem]);
			setName("");
			setDescription("");
			setPrice(0);
			setCategory("");
			setImage("");
			setIsFormShowing(false);
		}
	}



	async function deleteItem(id){
		const response = await fetch(`${apiURL}/items/${id}` , {
			method: "DELETE",
		})

		const filteredItems = items.filter(item => {
			if(item.id === id){
				return false;
			} else {
				return true
			}
		})

		setItems(filteredItems)
		setCurrentItems(null)
	}

	function confirmDelete(id){
		const confirmed = window.confirm("Are you sure you want to delete this item?");

		if (confirmed){
			deleteItem(id)
		}
	}

	const updateItem = async (event) => {
		event.preventDefault();
	
		// Prepare updated item data
		const updatedItemData = {};
		if (updatedName !== "") updatedItemData.name = updatedName;
		if (updatedDescription !== "") updatedItemData.description = updatedDescription;
		if (updatedPrice !== "") updatedItemData.price = parseFloat(updatedPrice); // Convert to number
		if (updatedCategory !== "") updatedItemData.category = updatedCategory;
		if (updatedImage !== "") updatedItemData.image = updatedImage;
	
		// Perform API call to update item
		try {
			const response = await fetch(`${apiURL}/items/${currentItem.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedItemData),
			});
	
			if (response.ok) {
				// Update item in state
				const updatedItem = await response.json();
				setItems(items.map(item => item.id === currentItem.id ? updatedItem : item));
				// Reset form fields
				setUpdatedName("");
				setUpdatedDescription("");
				setUpdatedPrice(0);
				setUpdatedCategory("");
				setUpdatedImage("");
				// Optionally, update currentItem state to reflect changes immediately
				setCurrentItem(updatedItem);
			} else {
				console.error("Failed to update item");
				// Handle error
			}
		} catch (error) {
			console.error("Error updating item:", error);
			// Handle error
		}
	};
	


	if (currentItem){
		return(
			<main>
				<h1>{currentItem.name}</h1>
				<p>£{currentItem.price.toFixed(2)}</p>
				<p>{currentItem.description}</p>
				<img src={currentItem.image} alt=""/>
				<p>
				<button className="all-items-button" onClick={() => setCurrentItems(null)}>All Items</button>
				</p>
				<p>
				<button className="delete-item-button" onClick={() => confirmDelete(currentItem.id)}>Delete Item</button>	
				</p>
				<form onSubmit={updateItem}>
                <p>
                    <label htmlFor="updatedName">Name</label>
                    <br />
                    <input
                        type="text"
                        name="updatedName"
                        id="updatedName"
                        value={updatedName}
                        onChange={event => setUpdatedName(event.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="updatedDescription">Description</label>
                    <br />
                    <textarea
                        name="updatedDescription"
                        id="updatedDescription"
                        value={updatedDescription}
                        onChange={event => setUpdatedDescription(event.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="updatedPrice">Price</label>
                    <br />
                    <input
                        type="number"
                        name="updatedPrice"
                        id="updatedPrice"
                        value={updatedPrice}
                        onChange={event => setUpdatedPrice(event.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="updatedCategory">Category</label>
                    <br />
                    <input
                        type="text"
                        name="updatedCategory"
                        id="updatedCategory"
                        value={updatedCategory}
                        onChange={event => setUpdatedCategory(event.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="updatedImage">Image</label>
                    <br />
                    <input
                        type="url"
                        name="updatedImage"
                        id="updatedImage"
                        value={updatedImage}
                        onChange={event => setUpdatedImage(event.target.value)}
                    />
                </p>
                <p>
                    <button className="update-item-button" type="submit">Update Item</button>
                </p>
            </form>
			</main>
		)
	}

	return (
		<main className='list'>    
			<h1 className='title'>Inventory App</h1>


			{/* Added Search Bar */}
			<div className="search-container">
				<input 
					type="text" 
					className="search-input" 
					placeholder="Search..." 
					value={query}
					onChange={(event) => setQuery(event.target.value)}
				/>
				<button className="search-button">Search</button>
			</div>

        <ul className='grid-container'>
            {items.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).map((item) => (
                <li key={item.id}>
                    <h3 className='item-title' onClick={() => setCurrentItems(item)}>{item.name}</h3>
					
                    <img onClick={() => setCurrentItems(item)} className="img" src={item.image} alt="" />
                </li>
            ))}
        </ul>


		<div id='form-button'>
		<button className='show-form-button' onClick={() => setIsFormShowing(!isFormShowing)}>
					{isFormShowing ? "Close" : "Add Item"}
				</button>
				</div>
				{isFormShowing && (
					<form id='addItemForm' onSubmit={addItem}>
						<p>
							<label htmlFor="name">Name</label>
							<br />
							<input
								type="text"
								name="name"
								id="name"
								className='form-input'
								value={name}
								onChange={event => setName(event.target.value)}
							/>
						</p>
						<p>
							<label htmlFor="description">Description</label>
							<br />
							<textarea
								name="description"
								id="description"
								className='form-input'
								value={description}
								onChange={event => setDescription(event.target.value)}
							/>
						</p>
						<p>
							<label htmlFor="price">Price</label>
							<br />
							<input
								type="number"
								name="price"
								id="price"
								className='form-input'
								value={price}
								onChange={event => setPrice(event.target.valueAsNumber)}
							/>
						</p>
						<p>
							<label htmlFor="category">Category</label>
							<br />
							<input
								type="text"
								name="category"
								id="category"
								className='form-input'
								value={category}
								onChange={event => setCategory(event.target.value)}
							/>
						</p>
						<p>
							<label htmlFor="image">Image</label>
							<br />
							<input
								type="url"
								name="image"
								id="image"
								className='form-input'
								value={image}
								onChange={event => setImage(event.target.value)}
							/>
						</p>
						<p>
							<button className='form-button' type="submit">Add Item</button>
						</p>
					</form>
				)}

		
	
		</main>
	)


}