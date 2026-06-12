// const express = require('express');
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const Order = require('../models/Order');
// const Inventory = require('../models/Inventory');
// const { sendLowStockEmail } = require('../utils/emailService');
// const router = express.Router();

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // 1. Create Order (Razorpay)
// router.post('/create', async (req, res) => {
//     try {
//         const options = {
//             amount: req.body.amount * 100, // Amount in paisa
//             currency: "INR",
//             receipt: `receipt_order_${Math.floor(Math.random() * 1000)}`,
//         };
//         const order = await razorpay.orders.create(options);
//         res.json(order);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // 2. Verify Payment & Update Inventory
// router.post('/verify', async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customizations, userId, amount } = req.body;

//     // Verify Signature
//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//                                .update(sign.toString())
//                                .digest("hex");

//     if (razorpay_signature === expectedSign) {
//         // Payment successful - Create Order record
//         const newOrder = new Order({
//             userId,
//             customizations,
//             totalPrice: amount,
//             status: 'Received',
//             paymentId: razorpay_payment_id,
//             paymentStatus: 'Success'
//         });
//         await newOrder.save();

//         // Update Inventory & Check Thresholds
//         const itemsToUpdate = [customizations.base, customizations.sauce, customizations.cheese, ...customizations.veggies];
        
//         for (let itemName of itemsToUpdate) {
//             const item = await Inventory.findOneAndUpdate(
//                 { name: itemName },
//                 { $inc: { quantity: -1 } },
//                 { new: true }
//             );

//             // Trigger Email Notification if below threshold
//             if (item && item.quantity < item.threshold) {
//                 await sendLowStockEmail(item.name, item.quantity);
//             }
//         }

//         res.json({ success: true, message: "Payment verified, order placed!" });
//     } else {
//         res.status(400).json({ success: false, message: "Invalid signature" });
//     }
// });

// // 3. Admin Update Order Status
// router.put('/:id/status', async (req, res) => {
//     const { status } = req.body; // e.g., 'In the kitchen'
//     const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
//     res.json(order);
// });

// // 4. User Polls Order Status
// router.get('/:id', async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     res.json(order);
// });

// module.exports = router;

// const express = require('express');
// const Razorpay = require('razorpay');
// const crypto = require('crypto'); // Required for verifying payment signature
// const Order = require('../models/Order'); // Required to save to database
// const router = express.Router();

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // 1. Create Order (Razorpay)
// router.post('/create', async (req, res) => {
//     try {
//         const options = {
//             amount: req.body.amount * 100, // Amount in paisa
//             currency: "INR",
//             receipt: `receipt_order_${Math.floor(Math.random() * 1000)}`,
//         };
//         const order = await razorpay.orders.create(options);
//         res.json(order);
//     } catch (err) {
//         console.error("Razorpay Create Error:", err);
//         res.status(500).json({ error: err.message });
//     }
// });

// // 2. Verify Payment & Update Database
// router.post('/verify', async (req, res) => {
//     try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customizations, userId, amount } = req.body;

//         // Verify Signature
//         const sign = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//                                    .update(sign.toString())
//                                    .digest("hex");

//         if (razorpay_signature === expectedSign) {
//             // Payment successful - Create Order record
//             const newOrder = new Order({
//                 userId: userId || "DUMMY_USER_123",
//                 items: customizations, // Saves the whole cart array
//                 totalPrice: amount,
//                 status: 'Received',
//                 paymentId: razorpay_payment_id,
//                 paymentStatus: 'Success'
//             });
//             await newOrder.save();

//             res.json({ success: true, message: "Payment verified, order placed!" });
//         } else {
//             res.status(400).json({ success: false, message: "Invalid signature" });
//         }
//     } catch (err) {
//         console.error("Database Save Error:", err);
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

// module.exports = router;

// const express = require('express');
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const Order = require('../models/Order');
// const Inventory = require('../models/Inventory'); // <--- Imported Inventory Model
// const router = express.Router();

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // 1. Create Order (Razorpay)
// router.post('/create', async (req, res) => {
//     try {
//         const options = {
//             amount: req.body.amount * 100, // Amount in paisa
//             currency: "INR",
//             receipt: `receipt_order_${Math.floor(Math.random() * 1000)}`,
//         };
//         const order = await razorpay.orders.create(options);
//         res.json(order);
//     } catch (err) {
//         console.error("Razorpay Create Error:", err);
//         res.status(500).json({ error: err.message });
//     }
// });

// // 2. Verify Payment, Save Order & Deduct Inventory
// router.post('/verify', async (req, res) => {
//     try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customizations, userId, amount } = req.body;

//         const sign = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//                                    .update(sign.toString())
//                                    .digest("hex");

//         if (razorpay_signature === expectedSign) {
//             // A. Create Order record
//             const newOrder = new Order({
//                 userId: userId || "000000000000000000000000",
//                 items: customizations,
//                 totalPrice: amount,
//                 status: 'Received',
//                 paymentId: razorpay_payment_id,
//                 paymentStatus: 'Success'
//             });
//             await newOrder.save();

//             // B. Automatically Deduct Inventory
//             try {
//                 for (const cartItem of customizations) {
//                     const { base, sauce, cheese, veggies } = cartItem.customizations;
//                     // Deduct main ingredients (-1 each)
//                     await Inventory.findOneAndUpdate({ item: base }, { $inc: { quantity: -1 } });
//                     await Inventory.findOneAndUpdate({ item: sauce }, { $inc: { quantity: -1 } });
//                     await Inventory.findOneAndUpdate({ item: cheese }, { $inc: { quantity: -1 } });
                    
//                     // Deduct each veggie chosen
//                     for (const veg of veggies) {
//                         await Inventory.findOneAndUpdate({ item: veg }, { $inc: { quantity: -1 } });
//                     }
//                 }
//             } catch (invErr) {
//                 console.error("Inventory deduction warning:", invErr); // Won't crash the order if an item is missing
//             }

//             res.json({ success: true, message: "Payment verified, order placed!" });
//         } else {
//             res.status(400).json({ success: false, message: "Invalid signature" });
//         }
//     } catch (err) {
//         console.error("Database Save Error:", err);
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

// // 3. Get User Specific Order History (Step 10)
// router.get('/user/:userId', async (req, res) => {
//     try {
//         const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//         res.json(orders);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;

const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const nodemailer = require('nodemailer'); // <-- Imported Nodemailer
const Order = require('../models/Order');
const Inventory = require('../models/Inventory');
const router = express.Router();

// Setup Nodemailer for Admin Alerts
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// 1. Create Order (Razorpay)
router.post('/create', async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100, 
            currency: "INR",
            receipt: `receipt_order_${Math.floor(Math.random() * 1000)}`,
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        console.error("Razorpay Create Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// 2. Verify Payment, Deduct Inventory & Send Emails
router.post('/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customizations, userId, amount } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                                   .update(sign.toString())
                                   .digest("hex");

        if (razorpay_signature === expectedSign) {
            
            // A. Save the Order
            const newOrder = new Order({
                userId: userId || "000000000000000000000000",
                items: customizations,
                totalPrice: amount,
                status: 'Received',
                paymentId: razorpay_payment_id,
                paymentStatus: 'Success'
            });
            await newOrder.save();

            // Admin Email Address (Sends to the email used in .env)
            const adminEmail = process.env.EMAIL_USER; 

            // B. Send "New Order" Email
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: adminEmail,
                    subject: `🍕 New Order Received! (ID: ${newOrder._id})`,
                    text: `You have received a new order for ₹${amount}.\n\nItems: ${customizations.length} Pizza(s).\nPlease check the Admin Dashboard to start cooking!`
                });
            } catch (mailErr) {
                console.error("Order Alert Email Failed:", mailErr);
            }

            // C. Deduct Inventory & Check for Low Stock
            try {
                let lowStockItems = [];

                // Helper function to deduct and check stock
                const deductAndCheck = async (itemName) => {
                    const updatedItem = await Inventory.findOneAndUpdate(
                        { item: itemName }, 
                        { $inc: { quantity: -1 } },
                        { new: true } // Returns the newly updated database entry
                    );
                    // If the item drops to or below its threshold (20)
                    if (updatedItem && updatedItem.quantity <= (updatedItem.threshold || 20)) {
                        lowStockItems.push(`${updatedItem.item} (Remaining: ${updatedItem.quantity})`);
                    }
                };

                // Loop through cart and deduct
                for (const cartItem of customizations) {
                    const { base, sauce, cheese, veggies } = cartItem.customizations;
                    await deductAndCheck(base);
                    await deductAndCheck(sauce);
                    await deductAndCheck(cheese);
                    for (const veg of veggies) {
                        await deductAndCheck(veg);
                    }
                }

                // D. Send "Low Stock" Email if needed
                if (lowStockItems.length > 0) {
                    // Remove duplicate alerts if multiple pizzas used the same low ingredient
                    const uniqueLowStock = [...new Set(lowStockItems)]; 
                    
                    await transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: adminEmail,
                        subject: `⚠️ URGENT: Low Inventory Alert!`,
                        text: `The following items have dropped to 20 or below:\n\n${uniqueLowStock.join('\n')}\n\nPlease restock immediately via the Admin Dashboard.`
                    });
                }
            } catch (invErr) {
                console.error("Inventory deduction warning:", invErr);
            }

            res.json({ success: true, message: "Payment verified, order placed!" });
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (err) {
        console.error("Database Save Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. Get User Specific Order History
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;