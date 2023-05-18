import React, { useState, useEffect } from "react";
import axios from "axios";

const Item = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/items");
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createItem = async () => {
    try {
        await axios.post('http://localhost:3001/api/items', {name : newItem} );
        setNewItem('');
        fetchItems();
    } catch (error) {
        console.log(error)
    }
  };

  const deleteItem = async (id) => {
    try {
        await axios.delete(`http://localhost:3001/api/items/${id}`);
        fetchItems();
    } catch (error) {
        console.log(error);
    }
  };

  return(
    <div>
        <h1>Items</h1>
        <ul>
            {
                items.map((item) =>(
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </li>
                ))
            }
        </ul>
        <input type="text" value={newItem} onChange={(e)=> setNewItem(e.target.value)} />
        <button onClick={createItem}>Add Item</button>
    </div>
  )
};


export default Item;