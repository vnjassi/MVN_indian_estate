const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Property = require('./models/Property');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Database Connected: MVN Estate Hub"))
    .catch(err => console.log("❌ Connection Error:", err));

// --- API ROUTES ---

// 1. SEARCH HUB: Get all properties with filters
app.get('/api/properties', async (req, res) => {
    try {
        const { location, type, minPrice } = req.query;
        let query = {};
        
        if (location) query.location = new RegExp(location, 'i');
        if (type) query.category = type;
        if (minPrice) query.price = { $gte: minPrice };

        const listings = await Property.find(query).populate('seller', 'name email');
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// 2. SELLER HUB: Post a new property
app.post('/api/properties', async (req, res) => {
    try {
        const newListing = new Property(req.body);
        const savedListing = await newListing.save();
        res.status(201).json(savedListing);
    } catch (err) {
        res.status(400).json({ message: "Check your data fields" });
    }
});

// 3. COMMUNITY HUB: Get latest activity (Dummy logic for forum/hub)
app.get('/api/community/stats', (req, res) => {
    res.json({
        activeUsers: 120500,
        recentDiscussions: [
            "Legal tips for Gurgaon buyers",
            "Market trends 2026",
            "Best Vastu for Apartments"
        ]
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Hub Server running on port ${PORT}`));
