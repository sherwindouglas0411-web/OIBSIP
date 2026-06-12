const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendLowStockEmail = async (itemName, currentQuantity) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `⚠️ Low Stock Alert: ${itemName}`,
        text: `The inventory for ${itemName} has dropped to ${currentQuantity}. Please restock immediately.`
    };
    await transporter.sendMail(mailOptions);
};

module.exports = { sendLowStockEmail };