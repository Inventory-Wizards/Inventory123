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
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredItems(filtered);
    }, [query, items]);
	
	

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



	if (currentItem){
		return(
			<main>
				<h1>{currentItem.name}</h1>
				<p>£{currentItem.price.toFixed(2)}</p>
				<p>{currentItem.description}</p>
				<img src={currentItem.image} alt=""/>
				<p>
				<button onClick={() => setCurrentItems(null)}>All Items</button>
				</p>
				<p>
				<button onClick={() => confirmDelete(currentItem.id)}>Delete Item</button>	
				</p>
			</main>
		)
	}


	return (
		<main className='list'>    
        <h1 className='title'>Inventory App</h1>

        <label htmlFor='search'>Search</label>
        <input 
            type="text" 
            id='search'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
        />

        <ul className='grid-container'>
            {items.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).map((item) => (
                <li key={item.id}>
                    <h3 onClick={() => setCurrentItems(item)}>{item.name}</h3>
                    <img className="img" src={item.image} alt="" />
                </li>
            ))}
        </ul>


		
		<button onClick={() => setIsFormShowing(!isFormShowing)}>
					{isFormShowing ? "Hide Form" : "Show Form"}
				</button>
				{isFormShowing && (
					<form onSubmit={addItem}>
						<p className="huge">
							<label htmlFor="name">Name</label>
							<br />
							<input
								type="text"
								name="name"
								id="name"
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
								value={price}
								onChange={event => setPrice(event.target.value)}
							/>
						</p>
						<p>
							<label htmlFor="category">Category</label>
							<br />
							<input
								type="text"
								name="category"
								id="category"
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
								value={image}
								onChange={event => setImage(event.target.value)}
							/>
						</p>
						<p>
							<button type="submit">Add Item</button>
						</p>
					</form>
				)}

		
	
		</main>
	)


}