import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [sauces, setSauces] = useState([]);

	async function fetchSauces(){
		try {
			const response = await fetch(`${apiURL}/sauces`);
			const saucesData = await response.json();
			
			setSauces(saucesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchSauces();
	}, []);

	return (
		<main>	
      <h1>Sauce Store</h1>
			<h2>All things 🔥</h2>
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
			<SaucesList sauces={sauces} />
			
		</main>
	)


}