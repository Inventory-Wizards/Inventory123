import React, { useState, useEffect } from 'react';
// import { SaucesList } from './SaucesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [items, setItems] = useState([]);
	const [currentItem, setCurrentItems] = useState(null);

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

	useEffect(() => {
		async function fetchItems(){
			try {
				const response = await fetch(`${apiURL}/items`);
				const itemsData = await response.json();
				
				setItems(itemsData);
			} catch (err) {
				console.log("Oh no an error! ", err)
			}
		}

		fetchItems();
	}, []);

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
		<main>	
      <h1>Inventory App</h1>
		<ul>
	 			 {items.map(item => (
				<li key={item.id}>
					<h2>
					<button onClick={()=> setCurrentItems(item)}>{item.name}</button>
					</h2>
					<img src={item.image} alt="" />
				</li>
	  			))}
	    </ul>
			
  <h3>Add an Item</h3>
  <form id="addItemForm">
  <label for="image">Image:</label>
  <input type="file" id="image" name="image" accept="image/*" required />
  <br />
  <br />
    <label htmlFor="name">Item Name:</label>
    <input type="text" id="name" name="name" required="" />
    <br />
    <br />
    <label htmlFor="description">Description:</label>
    <input type="text" id="description" name="description" required="" />
    <br />
    <br />
	<label htmlFor="category">Category:</label>
    <input type="text" id="category" name="category" required="" />
    <br />
    <br />
    <label htmlFor="price">Price:</label>
    <input type="number" id="price" name="price" required="" />
    <br />
    <br />
    <button type="submit" onClick="addItem()">Add Item</button>
  </form>
			<br />
			{/* <SaucesList sauces={sauces} /> */}
			
		</main>
	)


}