const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    location: String,
    category: { type: String, enum: ['Buy', 'Rent', 'Commercial'] },
    images: [String],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Links to your User community
    },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);
