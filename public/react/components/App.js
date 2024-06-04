import React, { useState, useEffect } from 'react';
// import { SaucesList } from './SaucesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [items, setItems] = useState([]);

	

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

	return (
		<main>	
      <h1>Inventory App</h1>
		<ul>
	 			 {items.map(item => (
				<li key={item.id}>
					<h2>{item.name}</h2>
					<img src={item.image} alt="" />
				</li>
	  			))}
	    </ul>
			
  <h1>Add an Item</h1>
  <form id="addItemForm">
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