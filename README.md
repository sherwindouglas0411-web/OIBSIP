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
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and set up your environment variables

```bash
cd backend
npm install
```

Create a .env file in the backend folder and add the following

### env
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_16_character_google_app_password
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

Start the backend server:
```bash
node server.js
```

### (The server should log "MongoDB Connected" and run on port 5000).

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies.

```bash
cd frontend
npm install
```

Create a .env file in the frontend folder and add your Razorpay public key (must start with REACT_APP_):

```bash
env
REACT_APP_RAZORPAY_KEY_ID = your_razorpay_test_key_id
```

Start the React application:

```bash
npm start
```

(The application will open automatically in your browser at
```bash
http://localhost:3000).
```

### 4. First Time Setup (Database Seeding)
To test the app, you need inventory in your database!
- 1. Go to application and register an Admin account.
- 2. Once logged in, click the **Load Initail Inventory Data** button on the Admin Dashboard to populate the database with dummy ingredients.
- 3. You are now ready to place the orders! 

