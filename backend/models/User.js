// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['user', 'admin'], default: 'user' },
//     isVerified: { type: Boolean, default: false } // For the email verification step later
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
    isVerified: { type: Boolean, default: false },
    // New fields for the security flows
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);