// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// // Register Route
// router.post('/register', async (req, res) => {
//     try {
//         const { name, email, password, role } = req.body;

//         // Check if user exists
//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ message: "User already exists" });

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create new user (Role defaults to 'user' unless specified as 'admin')
//         user = new User({ name, email, password: hashedPassword, role });
//         await user.save();

//         res.status(201).json({ message: "Registration successful. Please verify your email." });
//         // NOTE: We will trigger the verification email function here later!

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Login Route
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Invalid credentials" });

//         // Check password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//         // Generate JWT Token
//         const token = jwt.sign(
//             { id: user._id, role: user.role }, 
//             process.env.JWT_SECRET, 
//             { expiresIn: '1d' }
//         );

//         res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const router = express.Router();

// Setup Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// 1. REGISTER (User & Admin)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate Verification Token
        const verificationToken = crypto.randomBytes(20).toString('hex');

        user = new User({ name, email, password: hashedPassword, role, verificationToken });
        await user.save();

        // Send Verification Email
        const verifyUrl = `http://localhost:3000/verify/${verificationToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Verify your Pizza App Account',
            text: `Click this link to verify your email: ${verifyUrl}`
        });

        res.status(201).json({ message: "Registration successful. Please check your email to verify." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. VERIFY EMAIL
router.get('/verify/:token', async (req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.params.token });
        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.isVerified = true;
        user.verificationToken = undefined; // Clear the token
        await user.save();

        res.json({ message: "Email verified successfully! You can now log in." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. LOGIN (Requires Verification)
router.post('/login', async (req, res) => {
    try {
        const { email, password, requestedRole } = req.body; // requestedRole separates Admin vs User portals

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Ensure they are logging into the correct portal
        if (user.role !== requestedRole) {
            return res.status(403).json({ message: `Access denied. You are not registered as an ${requestedRole}.` });
        }

        //if (!user.isVerified) return res.status(403).json({ message: "Please verify your email first." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "No user found with this email" });

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 3600000; // 1 Hour expiry
        await user.save();

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Click here: ${resetUrl}`
        });

        res.json({ message: "Password reset link sent to your email." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. RESET PASSWORD
router.post('/reset-password/:token', async (req, res) => {
    try {
        const user = await User.findOne({ 
            resetPasswordToken: req.params.token, 
            resetPasswordExpire: { $gt: Date.now() } 
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired reset token" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.json({ message: "Password reset successfully! You can now log in." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;