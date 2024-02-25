const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to handle CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Body parser middleware
app.use(bodyParser.json());

// POST endpoint for adding numbers
app.post('/addition', (req, res) => {
    console.log("hi");
    const { inp1, inp2 } = req.body;
    const result = inp1 + inp2;
    res.json({ result });
});

// Server listening on port 8080
const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server is running on port 8080');
});