import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fileToBase64 } from "file64"

const BASE_URL= process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get(BASE_URL + '/api/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleAddItem = async () => {
    if (!itemName || !itemQuantity || !selectedFile) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const imageURL = await fileToBase64(selectedFile);
      const response = await axios.post(BASE_URL + '/api/inventory', {
        name: itemName,
        quantity: itemQuantity,
        imageURL: imageURL
      });

      setInventory([...inventory, response.data]);

      // Clear input fields after adding new item
      setItemName('');
      setItemQuantity('');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error adding new item:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (id, newName, newQuantity) => {
    if (!newName || !newQuantity) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(BASE_URL + `/api/inventory/${
        
      id}`, {
        name: newName,
        quantity: newQuantity
      });

      const updatedInventory = inventory.map(item => {
        if (item.id === id) {
          return { ...item, name: newName, quantity: newQuantity };
        }
        return item;
      });

      setInventory(updatedInventory);
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      setLoading(true);
      await axios.delete(BASE_URL + `/api/inventory/${id}`);

      const updatedInventory = inventory.filter(item => item.id !== id);
      setInventory(updatedInventory);
    } catch (error) {
      console.error('Error deleting item:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemQuantity(item.quantity);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setItemName('');
    setItemQuantity('');
  };

  return (
    <div className="inventory-container">
      <h2>Inventory:</h2>
      {loading && <p></p>}
      {error && <p>Error: {error}</p>}
      <div className="add-item-container">
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setSelectedFile(file);
          }}
        />
        {!editingItem ? (
          <button onClick={handleAddItem}>Add Item</button>
        ) : (
          <>
            <button onClick={() => handleUpdateItem(editingItem._id, itemName, itemQuantity)}>Update Item</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        )}
      </div>
      {inventory.length === 0 && <p>.</p>}
      <div className="inventory-list d-flex flex-row gap-2 flex-wrap">
        {inventory.map((item) => (
          <div key={item.id} className="inventory-item">
            <p>Name: {item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <img src={item.imageURL} alt={item.name} />
            <button onClick={() => handleEdit(item)}>Update</button>
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
