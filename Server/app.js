const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Middleware to handle CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Body parser middleware
app.use(bodyParser.json({ limit:"10mb" }));

// MongoDB connection
mongoose.connect('mongodb+srv://kandatibonendrareddy9:kandatibonendra@assignment3.ktldej9.mongodb.net/Assignment3')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Inventory Schema
const inventorySchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    imageURL: String
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

// Inventory Model
const InventoryItem = mongoose.model('InventoryItem', inventorySchema);
const User = mongoose.model('userSchema', userSchema);



// POST endpoint for user login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST endpoint for user registration
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already taken' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// POST endpoint to add an inventory item
app.get('/api/inventory', async (req, res) => {
    try {
        res.status(201).json(await InventoryItem.find({}));
    } catch (error) {
        console.error('Error adding item to inventory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/inventory', async (req, res) => {
    try {
        const newItem = new InventoryItem(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error adding item to inventory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/inventory/:id', async (req, res) => {
    try {
        const newItem = await InventoryItem.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error adding item to inventory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/inventory/:id', async (req, res) => {
    try {
        res.status(201).json(await InventoryItem.findByIdAndDelete(req.params.id));
    } catch (error) {
        console.error('Error adding item to inventory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Server listening on port 8080
const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server is running on port 8080');
});
