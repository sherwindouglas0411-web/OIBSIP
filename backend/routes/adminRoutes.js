const express = require('express');
const Inventory = require('../models/Inventory');
const Order = require('../models/Order');
const router = express.Router();

// 1. Get all Inventory
router.get('/inventory', async (req, res) => {
    try {
        const inventory = await Inventory.find({});
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Manually Update Inventory Stock
router.put('/inventory/:id', async (req, res) => {
    try {
        const { quantity } = req.body;
        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Get all Orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }); // Newest first
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Change Order Status (Step 9)
router.put('/orders/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Helper: Seed Initial Inventory (So your database isn't empty!)
router.post('/seed-inventory', async (req, res) => {
    try {
        const items = [
            { item: 'Classic Hand Tossed', category: 'base', quantity: 50 },
            { item: 'Cheese Burst', category: 'base', quantity: 50 },
            { item: 'Tomato Basil', category: 'sauce', quantity: 50 },
            { item: 'Mozzarella', category: 'cheese', quantity: 50 },
            { item: 'Onion', category: 'veggie', quantity: 50 },
            { item: 'Mushroom', category: 'veggie', quantity: 50 }
        ];
        // Ignore errors if they already exist
        await Inventory.insertMany(items, { ordered: false }).catch(e => console.log("Some items exist"));
        res.json({ message: "Inventory seeded successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;