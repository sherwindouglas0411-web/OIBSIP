// const mongoose = require('mongoose');

// const inventorySchema = new mongoose.Schema({
//     itemType: { type: String, enum: ['base', 'sauce', 'cheese', 'veggies', 'meat'], required: true },
//     name: { type: String, required: true },
//     quantity: { type: Number, required: true, default: 100 },
//     threshold: { type: Number, required: true, default: 20 }
// });

// module.exports = mongoose.model('Inventory', inventorySchema);

const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    item: { type: String, required: true, unique: true }, // e.g., "Classic Hand Tossed", "Tomato Basil"
    category: { type: String, required: true }, // "base", "sauce", "cheese", "veggie"
    quantity: { type: Number, default: 100 },
    threshold: { type: Number, default: 20 } // Trigger email when it drops below this
});

module.exports = mongoose.model('Inventory', inventorySchema);