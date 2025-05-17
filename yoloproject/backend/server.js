const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const productRoute = require('./routes/api/productRoute');

// Use environment variables or fallback defaults
const mongodb_url = process.env.MONGODB_URL || 'mongodb://mongo-service:27017/';
const dbName = process.env.DB_NAME || 'yolomy';

// Build full MongoDB connection URI
const MONGODB_URI = mongodb_url + dbName;

// Connect to MongoDB with options
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Handle connection events
const db = mongoose.connection;

db.once('open', () => {
    console.log('Database connected successfully');
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(upload.array());
app.use(cors());

// API routes
app.use('/api/products', productRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
