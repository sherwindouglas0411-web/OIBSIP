# 🍕 Full-Stack Custom Pizza Delivery App

A comprehensive, full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to order fully customizable pizzas. It features a complete user and admin ecosystem, secure payment integration via Razorpay, automated inventory management, and a real-time email notification system.

---

## 🛠️ Tech Stack
* **Frontend:** React.js, React Router, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JWT (JSON Web Tokens), bcryptjs
* **Payments:** Razorpay API
* **Email Services:** Nodemailer

---

## 📸 Application Showcase & Features

### 1. Secure Authentication (User & Admin Portals)
![Authentication Screen](./screenshots/auth.png)
* **Description:** Separate, secure login and registration portals for Users and Admins. Features include JWT authorization, password hashing, and a complete Forgot/Reset Password flow via email.

### 2. User Dashboard & Interactive Pizza Builder
![Pizza Builder](./screenshots/builder.png)
* **Description:** Users can view a menu of base pizzas (e.g., Veggie Supreme, Mac and Cheese) and dive into a custom builder. They can fully customize their order by selecting their preferred base, sauce, cheese, and multiple veggie add-ons (with dynamic pricing).

### 3. Shopping Cart & Razorpay Checkout
![Cart and Payment](./screenshots/checkout.png)
* **Description:** Users can add multiple custom pizzas to their cart. Upon checkout, the app integrates with Razorpay's secure payment gateway to process the transaction before officially placing the order in the database.

### 4. User Order History & Live Status Tracking
![Order History](./screenshots/history.png)
* **Description:** A dedicated tab for users to view all their past orders, the total amount paid, and the real-time status of their food (e.g., "Received", "In the kitchen", "Sent to delivery").

### 5. Admin Dashboard & Order Management
![Admin Orders](./screenshots/admin-orders.png)
* **Description:** Admins can view all incoming orders globally and manually update the status of each order. As the Admin changes the status, it instantly reflects on the User's portal.

### 6. Automated Inventory Management
![Inventory System](./screenshots/inventory.png)
* **Description:** A mini inventory system that tracks bases, sauces, cheese, and veggies. 
  * **Auto-Deduction:** Whenever a user successfully pays for an order, the exact ingredients used are automatically deducted from the database.
  * **Manual Control:** Admins can manually increase or decrease stock levels.

### 7. Automated Email Notifications
![Email Alerts](./screenshots/emails.png)
* **Description:** Integrated with Nodemailer to handle vital alerts:
  * **Order Alerts:** Admins receive an email the moment a new order is paid for and placed.
  * **Low Stock Warnings:** If any inventory item drops to a threshold of 20 or below after an order, the system automatically triggers an URGENT email to the Admin to restock.

---

## 🚀 Steps to Set Up the Application Locally

Follow these steps to run the application on your local machine.

### Prerequisites
* Node.js installed on your machine.
* A MongoDB database (Local or MongoDB Atlas).
* A Razorpay Test Account.
* A Gmail account with an "App Password" generated for Nodemailer.

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/pizza-delivery-app.git](https://github.com/yourusername/pizza-delivery-app.git)
cd pizza-delivery-app
