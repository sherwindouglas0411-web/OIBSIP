// import React, { useState } from 'react';
// import axios from 'axios';

// const PizzaBuilder = () => {
//     const [customizations, setCustomizations] = useState({
//         base: 'Thin Crust',
//         sauce: 'Tomato',
//         cheese: 'Mozzarella',
//         veggies: []
//     });

//     // Handle standard inputs (omitted for brevity)
    
//     const handleCheckout = async () => {
//         const amount = 500; // Calculate dynamically based on options in reality
        
//         try {
//             // 1. Create order on backend
//             const { data: order } = await axios.post('http://localhost:5000/api/orders/create', { amount });

//             // 2. Open Razorpay Checkout
//             const options = {
//                 key: "YOUR_RAZORPAY_TEST_KEY_ID", // Fetch from env or backend
//                 amount: order.amount,
//                 currency: "INR",
//                 name: "Custom Pizza App",
//                 description: "Test Transaction",
//                 order_id: order.id,
//                 handler: async function (response) {
//                     // 3. Verify Payment
//                     const verifyRes = await axios.post('http://localhost:5000/api/orders/verify', {
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature,
//                         customizations: customizations,
//                         userId: "DUMMY_USER_ID", // Replace with logged in user
//                         amount: amount
//                     });

//                     if(verifyRes.data.success) {
//                         alert("Order placed successfully! Tracking order...");
//                         // Route to order tracking dashboard
//                     }
//                 },
//                 theme: { color: "#3399cc" }
//             };
//             const rzp1 = new window.Razorpay(options);
//             rzp1.open();

//         } catch (error) {
//             console.error("Payment failed", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Build Your Custom Pizza</h2>
//             {/* Add dropdowns/checkboxes here to update 'customizations' state */}
//             <button onClick={handleCheckout}>Pay & Place Order</button>
//         </div>
//     );
// };

// export default PizzaBuilder;

// import React, { useState } from 'react';
// import axios from 'axios';

// const PizzaBuilder = () => {
//     // State to hold user selections
//     const [pizza, setPizza] = useState({
//         base: 'Classic Hand Tossed',
//         sauce: 'Tomato Basil',
//         cheese: 'Mozzarella',
//         veggies: [],
//     });

//     // Dummy pricing calculation
//     const calculatePrice = () => {
//         let basePrice = 200; // Base cost
//         let veggieCost = pizza.veggies.length * 30; // 30rs per veggie
//         return basePrice + veggieCost;
//     };

//     const handleVeggieChange = (e) => {
//         const { value, checked } = e.target;
//         if (checked) {
//             setPizza({ ...pizza, veggies: [...pizza.veggies, value] });
//         } else {
//             setPizza({ ...pizza, veggies: pizza.veggies.filter(v => v !== value) });
//         }
//     };

//     // Razorpay Integration
//     const handleCheckout = async () => {
//         const amount = calculatePrice();
        
//         try {
//             // 1. Ask backend to create a Razorpay Order ID
//             // NOTE: Make sure your backend server is running on port 5000!
//             const { data: order } = await axios.post('http://localhost:5000/api/orders/create', { amount });

//             // 2. Open Razorpay Checkout Window
//             const options = {
//                 key: process.env.REACT_APP_RAZORPAY_KEY_ID || "YOUR_TEST_KEY_HERE", // Add your key
//                 amount: order.amount,
//                 currency: "INR",
//                 name: "Pizza App",
//                 description: "Custom Pizza Order",
//                 order_id: order.id,
//                 handler: async function (response) {
//                     // 3. Verify Payment on Backend
//                     const verifyRes = await axios.post('http://localhost:5000/api/orders/verify', {
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature,
//                         customizations: pizza,
//                         userId: "DUMMY_USER_123", // We will replace this when we build Auth
//                         amount: amount
//                     });

//                     if(verifyRes.data.success) {
//                         alert("Payment Successful! Order sent to the kitchen.");
//                     }
//                 },
//                 theme: { color: "#ff6347" }
//             };
//             const rzp = new window.Razorpay(options);
//             rzp.open();

//         } catch (error) {
//             console.error("Payment failed to initialize", error);
//             alert("Error connecting to payment gateway.");
//         }
//     };

//     return (
//         <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
//             <h2>Build Your Dream Pizza</h2>

//             {/* Base Selection */}
//             <div style={{ marginBottom: '15px' }}>
//                 <label><strong>1. Choose Base:</strong> </label>
//                 <select value={pizza.base} onChange={(e) => setPizza({...pizza, base: e.target.value})}>
//                     <option value="Classic Hand Tossed">Classic Hand Tossed</option>
//                     <option value="Thin Crust">Wheat Thin Crust</option>
//                     <option value="Cheese Burst">Cheese Burst</option>
//                     <option value="Pan Pizza">Pan Pizza</option>
//                     <option value="Gluten Free">Gluten Free Base</option>
//                 </select>
//             </div>

//             {/* Sauce Selection */}
//             <div style={{ marginBottom: '15px' }}>
//                 <label><strong>2. Choose Sauce:</strong> </label>
//                 <select value={pizza.sauce} onChange={(e) => setPizza({...pizza, sauce: e.target.value})}>
//                     <option value="Tomato Basil">Tomato Basil</option>
//                     <option value="Spicy Garlic">Spicy Garlic</option>
//                     <option value="Pesto">Pesto</option>
//                     <option value="Barbeque">Barbeque</option>
//                     <option value="White Garlic">White Garlic Sauce</option>
//                 </select>
//             </div>

//             {/* Cheese Selection */}
//             <div style={{ marginBottom: '15px' }}>
//                 <label><strong>3. Select Cheese:</strong> </label>
//                 <select value={pizza.cheese} onChange={(e) => setPizza({...pizza, cheese: e.target.value})}>
//                     <option value="Mozzarella">Mozzarella</option>
//                     <option value="Cheddar">Cheddar</option>
//                     <option value="Vegan Cheese">Vegan Cheese</option>
//                 </select>
//             </div>

//             {/* Veggie Selection */}
//             <div style={{ marginBottom: '20px' }}>
//                 <label><strong>4. Add Veggies (₹30 each):</strong> </label><br/>
//                 {['Onion', 'Capsicum', 'Tomato', 'Jalapeno', 'Mushroom', 'Olives', 'Corn'].map(veggie => (
//                     <label key={veggie} style={{ marginRight: '10px' }}>
//                         <input type="checkbox" value={veggie} onChange={handleVeggieChange} /> {veggie}
//                     </label>
//                 ))}
//             </div>

//             <hr />
//             <h3>Total Price: ₹{calculatePrice()}</h3>
            
//             <button 
//                 onClick={handleCheckout} 
//                 style={{ background: '#ff6347', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
//                 Pay & Place Order
//             </button>
//         </div>
//     );
// };

// export default PizzaBuilder;

// import React, { useState } from 'react';
// import axios from 'axios';

// const PizzaBuilder = () => {
//     // Available Pizza Varieties
//     const pizzaVarieties = [
//         { id: 1, name: 'Veggie Supreme Pizza', basePrice: 250, emoji: '🥗' },
//         { id: 2, name: 'Non-Veg Chicken Pizza', basePrice: 350, emoji: '🍗' },
//         { id: 3, name: 'Golden Corn Pizza', basePrice: 200, emoji: '🌽' },
//         { id: 4, name: 'Classic Cheese Pizza', basePrice: 180, emoji: '🧀' }
//     ];

//     // State to track if a user has selected a base pizza from the menu
//     const [selectedVariety, setSelectedVariety] = useState(null);

//     // State for the customizations
//     const [pizza, setPizza] = useState({
//         base: 'Classic Hand Tossed',
//         sauce: 'Tomato Basil',
//         cheese: 'Mozzarella',
//         veggies: [],
//     });

//     // Calculate price dynamically based on the chosen variety + veggie toppings
//     const calculatePrice = () => {
//         if (!selectedVariety) return 0;
//         let basePrice = selectedVariety.basePrice; 
//         let veggieCost = pizza.veggies.length * 30; // ₹30 per extra veggie
//         return basePrice + veggieCost;
//     };

//     const handleVeggieChange = (e) => {
//         const { value, checked } = e.target;
//         if (checked) {
//             setPizza({ ...pizza, veggies: [...pizza.veggies, value] });
//         } else {
//             setPizza({ ...pizza, veggies: pizza.veggies.filter(v => v !== value) });
//         }
//     };

//     const handleCheckout = async () => {
//         const amount = calculatePrice();
        
//         try {
//             const { data: order } = await axios.post('http://localhost:5000/api/orders/create', { amount });

//             const options = {
//                 key: process.env.REACT_APP_RAZORPAY_KEY_ID || "YOUR_TEST_KEY_HERE", 
//                 amount: order.amount,
//                 currency: "INR",
//                 name: "Pizza App",
//                 description: `${selectedVariety.name} Order`,
//                 order_id: order.id,
//                 handler: async function (response) {
//                     const verifyRes = await axios.post('http://localhost:5000/api/orders/verify', {
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature,
//                         // Send the chosen variety along with the custom choices
//                         customizations: { type: selectedVariety.name, ...pizza },
//                         userId: "DUMMY_USER_123", // We will attach the real logged-in user ID later
//                         amount: amount
//                     });

//                     if(verifyRes.data.success) {
//                         alert("Payment Successful! Order sent to the kitchen.");
//                         // Reset back to menu after successful order
//                         setSelectedVariety(null);
//                         setPizza({ base: 'Classic Hand Tossed', sauce: 'Tomato Basil', cheese: 'Mozzarella', veggies: [] });
//                     }
//                 },
//                 theme: { color: "#ff6347" }
//             };
//             const rzp = new window.Razorpay(options);
//             rzp.open();

//         } catch (error) {
//             console.error("Payment failed", error);
//             alert("Error connecting to payment gateway.");
//         }
//     };

//     // VIEW 1: THE MENU DASHBOARD
//     if (!selectedVariety) {
//         return (
//             <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
//                 <h2>Our Menu: Choose a Pizza to Customize</h2>
//                 <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
//                     {pizzaVarieties.map(variety => (
//                         <div 
//                             key={variety.id} 
//                             onClick={() => setSelectedVariety(variety)}
//                             style={{ flex: '1 1 200px', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', background: '#fefefe' }}
//                         >
//                             <div style={{ fontSize: '50px' }}>{variety.emoji}</div>
//                             <h3>{variety.name}</h3>
//                             <p style={{ color: '#555' }}>Starting at ₹{variety.basePrice}</p>
//                             <button style={{ background: '#ff6347', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', width: '100%', cursor: 'pointer', marginTop: '10px' }}>
//                                 Select & Customize
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     // VIEW 2: THE CUSTOMIZATION BUILDER
//     return (
//         <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', background: '#fafafa' }}>
//             <button 
//                 onClick={() => setSelectedVariety(null)} 
//                 style={{ background: 'transparent', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', marginBottom: '20px', padding: 0 }}>
//                 ← Back to Menu
//             </button>
            
//             <h2>Customizing: <span style={{ color: '#ff6347' }}>{selectedVariety.name}</span></h2>

//             {/* Base Selection */}
//             <div style={{ marginBottom: '15px' }}>
//                 <label><strong>1. Choose Base:</strong> </label>
//                 <select value={pizza.base} onChange={(e) => setPizza({...pizza, base: e.target.value})} style={{ padding: '5px' }}>
//                     <option value="Classic Hand Tossed">Classic Hand Tossed</option>
//                     <option value="Thin Crust">Wheat Thin Crust</option>
//                     <option value="Cheese Burst">Cheese Burst</option>
//                     <option value="Pan Pizza">Pan Pizza</option>
//                     <option value="Gluten Free">Gluten Free Base</option>
//                 </select>
//             </div>

//             {/* Sauce Selection */}
//             <div style={{ marginBottom: '15px' }}>
//                 <label><strong>2. Choose Sauce:</strong> </label>
//                 <select value={pizza.sauce} onChange={(e) => setPizza({...pizza, sauce: e.target.value})} style={{ padding: '5px' }}>
//                     <option value="Tomato Basil">Tomato Basil</option>
//                     <option value="Spicy Garlic">Spicy Garlic</option>
//                     <option value="Pesto">Pesto</option>
//                     <option value="Barbeque">Barbeque</option>
//                     <option value="White Garlic">White Garlic Sauce</option>
//                 </select>
//             </div>

//             {/* Cheese Selection */}
//             <div style={{ marginBottom: '15px' }}>
//                 <label><strong>3. Select Cheese:</strong> </label>
//                 <select value={pizza.cheese} onChange={(e) => setPizza({...pizza, cheese: e.target.value})} style={{ padding: '5px' }}>
//                     <option value="Mozzarella">Mozzarella</option>
//                     <option value="Cheddar">Cheddar</option>
//                     <option value="Vegan Cheese">Vegan Cheese</option>
//                 </select>
//             </div>

//             {/* Veggie Selection */}
//             <div style={{ marginBottom: '20px' }}>
//                 <label><strong>4. Add Extra Veggies (₹30 each):</strong> </label><br/>
//                 {['Onion', 'Capsicum', 'Tomato', 'Jalapeno', 'Mushroom', 'Olives', 'Corn'].map(veggie => (
//                     <label key={veggie} style={{ marginRight: '10px', display: 'inline-block', marginTop: '8px' }}>
//                         <input type="checkbox" value={veggie} onChange={handleVeggieChange} /> {veggie}
//                     </label>
//                 ))}
//             </div>

//             <hr style={{ margin: '20px 0' }} />
//             <h3>Total Price: ₹{calculatePrice()}</h3>
            
//             <button 
//                 onClick={handleCheckout} 
//                 style={{ background: '#ff6347', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', width: '100%' }}>
//                 Pay ₹{calculatePrice()} & Place Order
//             </button>
//         </div>
//     );
// };

// export default PizzaBuilder;

// import React, { useState } from 'react';
// import axios from 'axios';

// const PizzaBuilder = () => {
//     // 1. Available Pizza Varieties (Added Mushroom and Mac & Cheese)
//     const pizzaVarieties = [
//         { id: 1, name: 'Veggie Supreme Pizza', basePrice: 250, emoji: '🥗' },
//         { id: 2, name: 'Non-Veg Chicken Pizza', basePrice: 350, emoji: '🍗' },
//         { id: 3, name: 'Golden Corn Pizza', basePrice: 200, emoji: '🌽' },
//         { id: 4, name: 'Classic Cheese Pizza', basePrice: 180, emoji: '🧀' },
//         { id: 5, name: 'Mushroom Pizza', basePrice: 220, emoji: '🍄' },
//         { id: 6, name: 'Mac and Cheese Pizza', basePrice: 280, emoji: '🧀🍝' }
//     ];

//     const defaultPizzaConfig = {
//         base: 'Classic Hand Tossed',
//         sauce: 'Tomato Basil',
//         cheese: 'Mozzarella',
//         veggies: [],
//     };

//     // 2. Application States
//     const [view, setView] = useState('menu'); // 'menu', 'builder', 'cart'
//     const [cart, setCart] = useState([]);
//     const [selectedVariety, setSelectedVariety] = useState(null);
//     const [pizza, setPizza] = useState(defaultPizzaConfig);

//     // 3. Price Calculations
//     const calculateCurrentPizzaPrice = () => {
//         if (!selectedVariety) return 0;
//         let veggieCost = pizza.veggies.length * 30; // ₹30 per extra veggie
//         return selectedVariety.basePrice + veggieCost;
//     };

//     const calculateCartTotal = () => {
//         return cart.reduce((total, item) => total + item.price, 0);
//     };

//     // 4. Cart Logic
//     const handleAddToCart = () => {
//         const newItem = {
//             id: Date.now(), // Unique ID for cart item
//             variety: selectedVariety,
//             customizations: pizza,
//             price: calculateCurrentPizzaPrice()
//         };
//         setCart([...cart, newItem]);
//         setSelectedVariety(null);
//         setPizza(defaultPizzaConfig);
//         setView('menu'); // Go back to menu after adding
//         alert(`${selectedVariety.name} added to cart!`);
//     };

//     const removeFromCart = (idToRemove) => {
//         setCart(cart.filter(item => item.id !== idToRemove));
//     };

//     const handleVeggieChange = (e) => {
//         const { value, checked } = e.target;
//         if (checked) {
//             setPizza({ ...pizza, veggies: [...pizza.veggies, value] });
//         } else {
//             setPizza({ ...pizza, veggies: pizza.veggies.filter(v => v !== value) });
//         }
//     };

//     // 5. Razorpay Checkout for Entire Cart
//     const handleCheckout = async () => {
//         const amount = calculateCartTotal();
//         if (amount === 0) return alert("Your cart is empty!");
        
//         try {
//             const { data: order } = await axios.post('http://localhost:5000/api/orders/create', { amount });

//             const options = {
//                 key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_T0E01FHF370wco", 
//                 amount: order.amount,
//                 currency: "INR",
//                 name: "Pizza App",
//                 description: `Order of ${cart.length} pizzas`,
//                 order_id: order.id,
//                 // handler: async function (response) {
//                 //     const verifyRes = await axios.post('http://localhost:5000/api/orders/verify', {
//                 //         razorpay_order_id: response.razorpay_order_id,
//                 //         razorpay_payment_id: response.razorpay_payment_id,
//                 //         razorpay_signature: response.razorpay_signature,
//                 //         customizations: cart, // Sending the whole cart array now!
//                 //         userId: "DUMMY_USER_123", 
//                 //         amount: amount
//                 //     });

//                 //     if(verifyRes.data.success) {
//                 //         alert("Payment Successful! Order sent to the kitchen.");
//                 //         setCart([]); // Clear cart
//                 //         setView('menu');
//                 //     }
//                 // },
//                 handler: async function (response) {
//                     // 1. Get the real logged-in user from your browser's local storage
//                     const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
                    
//                     // 2. Use their real ID, or use a valid 24-character dummy ID if testing without logging in
//                     const actualUserId = loggedInUser.id || "000000000000000000000000"; 

//                     const verifyRes = await axios.post('http://localhost:5000/api/orders/verify', {
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature,
//                         customizations: cart, 
//                         userId: actualUserId, // <-- Replaced DUMMY_USER_123 with this
//                         amount: amount
//                     });

//                     if(verifyRes.data.success) {
//                         alert("Payment Successful! Order sent to the kitchen.");
//                         setCart([]); 
//                         setView('menu');
//                     }
//                 },
//                 theme: { color: "#ff6347" }
//             };
//             const rzp = new window.Razorpay(options);
//             rzp.open();

//         } catch (error) {
//             console.error("Payment failed", error);
//             alert("Error connecting to payment gateway.");
//         }
//     };

//     // ==========================================
//     // RENDER UI BASED ON CURRENT VIEW
//     // ==========================================

//     if (view === 'cart') {
//         return (
//             <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
//                 <button onClick={() => setView('menu')} style={{ background: 'transparent', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', marginBottom: '20px' }}>← Back to Menu</button>
//                 <h2>Your Cart ({cart.length} Items)</h2>
                
//                 {cart.length === 0 ? (
//                     <p>Your cart is empty.</p>
//                 ) : (
//                     <div>
//                         {cart.map((item, index) => (
//                             <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <div>
//                                     <h4 style={{ margin: '0 0 5px 0' }}>{index + 1}. {item.variety.emoji} {item.variety.name}</h4>
//                                     <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
//                                         {item.customizations.base} | {item.customizations.sauce} | {item.customizations.cheese}
//                                     </p>
//                                     {item.customizations.veggies.length > 0 && (
//                                         <p style={{ margin: 0, fontSize: '14px', color: '#888' }}>+ {item.customizations.veggies.join(', ')}</p>
//                                     )}
//                                 </div>
//                                 <div style={{ textAlign: 'right' }}>
//                                     <strong>₹{item.price}</strong><br/>
//                                     <button onClick={() => removeFromCart(item.id)} style={{ background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '3px', padding: '5px 10px', marginTop: '5px', cursor: 'pointer', fontSize: '12px' }}>Remove</button>
//                                 </div>
//                             </div>
//                         ))}
//                         <h3 style={{ textAlign: 'right', marginTop: '20px' }}>Total: ₹{calculateCartTotal()}</h3>
//                         <button onClick={handleCheckout} style={{ background: '#ff6347', color: 'white', padding: '15px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '18px', width: '100%', marginTop: '10px' }}>
//                             Pay ₹{calculateCartTotal()} & Checkout
//                         </button>
//                     </div>
//                 )}
//             </div>
//         );
//     }

//     if (view === 'builder') {
//         return (
//             <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', background: '#fafafa' }}>
//                 <button onClick={() => { setSelectedVariety(null); setView('menu'); }} style={{ background: 'transparent', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', marginBottom: '20px', padding: 0 }}>← Cancel & Back to Menu</button>
                
//                 <h2>Customizing: <span style={{ color: '#ff6347' }}>{selectedVariety.name}</span></h2>

//                 <div style={{ marginBottom: '15px' }}>
//                     <label><strong>1. Choose Base:</strong> </label>
//                     <select value={pizza.base} onChange={(e) => setPizza({...pizza, base: e.target.value})} style={{ padding: '5px' }}>
//                         <option value="Classic Hand Tossed">Classic Hand Tossed</option>
//                         <option value="Thin Crust">Wheat Thin Crust</option>
//                         <option value="Cheese Burst">Cheese Burst</option>
//                         <option value="Pan Pizza">Pan Pizza</option>
//                         <option value="Gluten Free">Gluten Free Base</option>
//                     </select>
//                 </div>

//                 <div style={{ marginBottom: '15px' }}>
//                     <label><strong>2. Choose Sauce:</strong> </label>
//                     <select value={pizza.sauce} onChange={(e) => setPizza({...pizza, sauce: e.target.value})} style={{ padding: '5px' }}>
//                         <option value="Tomato Basil">Tomato Basil</option>
//                         <option value="Spicy Garlic">Spicy Garlic</option>
//                         <option value="Pesto">Pesto</option>
//                         <option value="Barbeque">Barbeque</option>
//                         <option value="White Garlic">White Garlic Sauce</option>
//                     </select>
//                 </div>

//                 <div style={{ marginBottom: '15px' }}>
//                     <label><strong>3. Select Cheese:</strong> </label>
//                     <select value={pizza.cheese} onChange={(e) => setPizza({...pizza, cheese: e.target.value})} style={{ padding: '5px' }}>
//                         <option value="Mozzarella">Mozzarella</option>
//                         <option value="Cheddar">Cheddar</option>
//                         <option value="Vegan Cheese">Vegan Cheese</option>
//                     </select>
//                 </div>

//                 <div style={{ marginBottom: '20px' }}>
//                     <label><strong>4. Add Extra Veggies (₹30 each):</strong> </label><br/>
//                     {['Onion', 'Capsicum', 'Tomato', 'Jalapeno', 'Mushroom', 'Olives', 'Corn'].map(veggie => (
//                         <label key={veggie} style={{ marginRight: '10px', display: 'inline-block', marginTop: '8px' }}>
//                             <input type="checkbox" value={veggie} onChange={handleVeggieChange} /> {veggie}
//                         </label>
//                     ))}
//                 </div>

//                 <hr style={{ margin: '20px 0' }} />
//                 <h3>Item Price: ₹{calculateCurrentPizzaPrice()}</h3>
                
//                 <button onClick={handleAddToCart} style={{ background: '#4CAF50', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', width: '100%' }}>
//                     Add to Cart
//                 </button>
//             </div>
//         );
//     }

//     // DEFAULT VIEW: MENU
//     return (
//         <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h2>Our Menu: Choose a Pizza</h2>
//                 <button onClick={() => setView('cart')} style={{ background: '#ffc107', color: 'black', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
//                     🛒 View Cart ({cart.length})
//                 </button>
//             </div>
            
//             <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
//                 {pizzaVarieties.map(variety => (
//                     <div 
//                         key={variety.id} 
//                         onClick={() => { setSelectedVariety(variety); setView('builder'); }}
//                         style={{ flex: '1 1 200px', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', background: '#fefefe' }}
//                     >
//                         <div style={{ fontSize: '50px' }}>{variety.emoji}</div>
//                         <h3>{variety.name}</h3>
//                         <p style={{ color: '#555' }}>Starting at ₹{variety.basePrice}</p>
//                         <button style={{ background: '#ff6347', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', width: '100%', cursor: 'pointer', marginTop: '10px' }}>
//                             Select & Customize
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PizzaBuilder;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PizzaBuilder = () => {
//     const navigate = useNavigate();
//     const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
//     const actualUserId = loggedInUser.id || "000000000000000000000000";

//     const pizzaVarieties = [
//         { id: 1, name: 'Veggie Supreme Pizza', basePrice: 250, emoji: '🥗' },
//         { id: 2, name: 'Non-Veg Chicken Pizza', basePrice: 350, emoji: '🍗' },
//         { id: 3, name: 'Golden Corn Pizza', basePrice: 200, emoji: '🌽' },
//         { id: 4, name: 'Classic Cheese Pizza', basePrice: 180, emoji: '🧀' },
//         { id: 5, name: 'Mushroom Pizza', basePrice: 220, emoji: '🍄' },
//         { id: 6, name: 'Mac and Cheese Pizza', basePrice: 280, emoji: '🧀🍝' }
//     ];

//     const defaultPizzaConfig = { base: 'Classic Hand Tossed', sauce: 'Tomato Basil', cheese: 'Mozzarella', veggies: [] };

//     const [view, setView] = useState('menu'); // 'menu', 'builder', 'cart', 'orders'
//     const [cart, setCart] = useState([]);
//     const [selectedVariety, setSelectedVariety] = useState(null);
//     const [pizza, setPizza] = useState(defaultPizzaConfig);
//     const [myOrders, setMyOrders] = useState([]);

//     const fetchMyOrders = async () => {
//         try {
//             const { data } = await axios.get(`http://localhost:5000/api/orders/user/${actualUserId}`);
//             setMyOrders(data);
//         } catch (error) { console.error("Could not fetch orders"); }
//     };

//     useEffect(() => {
//         if (view === 'orders') fetchMyOrders();
//     }, [view]);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         navigate('/user/login');
//     };

//     const calculateCurrentPizzaPrice = () => {
//         if (!selectedVariety) return 0;
//         return selectedVariety.basePrice + (pizza.veggies.length * 30);
//     };

//     const calculateCartTotal = () => cart.reduce((total, item) => total + item.price, 0);

//     const handleAddToCart = () => {
//         setCart([...cart, { id: Date.now(), variety: selectedVariety, customizations: pizza, price: calculateCurrentPizzaPrice() }]);
//         setSelectedVariety(null);
//         setPizza(defaultPizzaConfig);
//         setView('menu');
//         alert("Added to cart!");
//     };

//     const handleCheckout = async () => {
//         const amount = calculateCartTotal();
//         if (amount === 0) return;
        
//         try {
//             const { data: order } = await axios.post('http://localhost:5000/api/orders/create', { amount });
//             const options = {
//                 key: "rzp_test_abc123def456ghi", // Replace with your key
//                 amount: order.amount,
//                 currency: "INR",
//                 name: "Pizza App",
//                 description: `Order`,
//                 order_id: order.id,
//                 handler: async function (response) {
//                     const verifyRes = await axios.post('http://localhost:5000/api/orders/verify', {
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature,
//                         customizations: cart, 
//                         userId: actualUserId, 
//                         amount: amount
//                     });
//                     if(verifyRes.data.success) {
//                         alert("Payment Successful! Order sent to the kitchen.");
//                         setCart([]); 
//                         setView('orders');
//                     }
//                 },
//                 theme: { color: "#ff6347" }
//             };
//             new window.Razorpay(options).open();
//         } catch (error) { alert("Payment Failed"); }
//     };

//     // ==========================================
//     // RENDER LOGIC
//     // ==========================================

//     if (view === 'orders') {
//         return (
//             <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
//                 <button onClick={() => setView('menu')} style={{ background: 'transparent', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', marginBottom: '20px' }}>← Back to Menu</button>
//                 <h2>My Order History</h2>
//                 {myOrders.length === 0 ? <p>No orders placed yet.</p> : myOrders.map(order => (
//                     <div key={order._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//                             <strong>Order ID: {order._id}</strong>
//                             <span style={{ fontWeight: 'bold', color: order.status === 'Sent to delivery' ? 'green' : 'orange' }}>Status: {order.status}</span>
//                         </div>
//                         <p style={{ margin: 0 }}>Total Paid: ₹{order.totalPrice}</p>
//                         <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{order.items?.length || 0} Pizza(s)</p>
//                     </div>
//                 ))}
//             </div>
//         );
//     }

//     if (view === 'cart') {
//         return (
//             <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
//                 <button onClick={() => setView('menu')} style={{ background: 'transparent', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>← Back to Menu</button>
//                 <h2>Your Cart</h2>
//                 {cart.map((item, index) => (
//                     <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
//                         <h4>{index + 1}. {item.variety.name} - ₹{item.price}</h4>
//                     </div>
//                 ))}
//                 <h3>Total: ₹{calculateCartTotal()}</h3>
//                 <button onClick={handleCheckout} style={{ background: '#ff6347', color: 'white', padding: '15px', border: 'none', width: '100%', cursor: 'pointer' }}>Pay & Checkout</button>
//             </div>
//         );
//     }

//     if (view === 'builder') {
//         return (
//             <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
//                 <button onClick={() => { setSelectedVariety(null); setView('menu'); }} style={{ background: 'transparent', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', marginBottom: '10px' }}>← Cancel</button>
//                 <h2>Customizing: {selectedVariety.name}</h2>
//                 <label>1. Base: <select value={pizza.base} onChange={e => setPizza({...pizza, base: e.target.value})}><option value="Classic Hand Tossed">Classic Hand Tossed</option><option value="Cheese Burst">Cheese Burst</option></select></label><br/><br/>
//                 <label>2. Sauce: <select value={pizza.sauce} onChange={e => setPizza({...pizza, sauce: e.target.value})}><option value="Tomato Basil">Tomato Basil</option><option value="Pesto">Pesto</option></select></label><br/><br/>
//                 <label>3. Cheese: <select value={pizza.cheese} onChange={e => setPizza({...pizza, cheese: e.target.value})}><option value="Mozzarella">Mozzarella</option><option value="Vegan Cheese">Vegan Cheese</option></select></label><br/><br/>
//                 <button onClick={handleAddToCart} style={{ background: '#4CAF50', color: 'white', padding: '10px', width: '100%', cursor: 'pointer' }}>Add to Cart (₹{calculateCurrentPizzaPrice()})</button>
//             </div>
//         );
//     }

//     return (
//         <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//                 <h2>Welcome, {loggedInUser.name || 'User'}!</h2>
//                 <div>
//                     <button onClick={() => setView('orders')} style={{ marginRight: '10px', padding: '10px', cursor: 'pointer' }}>📦 My Orders</button>
//                     <button onClick={() => setView('cart')} style={{ marginRight: '10px', padding: '10px', background: '#ffc107', cursor: 'pointer' }}>🛒 Cart ({cart.length})</button>
//                     <button onClick={handleLogout} style={{ padding: '10px', background: 'red', color: 'white', cursor: 'pointer', border: 'none' }}>Logout</button>
//                 </div>
//             </div>
            
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
//                 {pizzaVarieties.map(v => (
//                     <div key={v.id} onClick={() => { setSelectedVariety(v); setView('builder'); }} style={{ border: '1px solid #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
//                         <div style={{ fontSize: '40px' }}>{v.emoji}</div>
//                         <h3>{v.name}</h3>
//                         <p>₹{v.basePrice}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PizzaBuilder;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PizzaBuilder = () => {
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
    const actualUserId = loggedInUser.id || "000000000000000000000000";

    const pizzaVarieties = [
        { id: 1, name: 'Veggie Supreme Pizza', basePrice: 250, emoji: '🥗' },
        { id: 2, name: 'Non-Veg Chicken Pizza', basePrice: 350, emoji: '🍗' },
        { id: 3, name: 'Golden Corn Pizza', basePrice: 200, emoji: '🌽' },
        { id: 4, name: 'Classic Cheese Pizza', basePrice: 180, emoji: '🧀' },
        { id: 5, name: 'Mushroom Pizza', basePrice: 220, emoji: '🍄' },
        { id: 6, name: 'Mac and Cheese Pizza', basePrice: 280, emoji: '🧀🍝' }
    ];

    const defaultPizzaConfig = { base: 'Classic Hand Tossed', sauce: 'Tomato Basil', cheese: 'Mozzarella', veggies: [] };

    const [view, setView] = useState('menu'); // 'menu', 'builder', 'cart', 'orders'
    const [cart, setCart] = useState([]);
    const [selectedVariety, setSelectedVariety] = useState(null);
    const [pizza, setPizza] = useState(defaultPizzaConfig);
    const [myOrders, setMyOrders] = useState([]);

    const fetchMyOrders = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/orders/user/${actualUserId}`);
            setMyOrders(data);
        } catch (error) { console.error("Could not fetch orders"); }
    };

    useEffect(() => {
        if (view === 'orders') fetchMyOrders();
    }, [view]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/user/login');
    };

    const calculateCurrentPizzaPrice = () => {
        if (!selectedVariety) return 0;
        return selectedVariety.basePrice + (pizza.veggies.length * 30);
    };

    const calculateCartTotal = () => cart.reduce((total, item) => total + item.price, 0);

    // RESTORED: Veggie Change Logic
    const handleVeggieChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setPizza({ ...pizza, veggies: [...pizza.veggies, value] });
        } else {
            setPizza({ ...pizza, veggies: pizza.veggies.filter(v => v !== value) });
        }
    };

    const handleAddToCart = () => {
        setCart([...cart, { id: Date.now(), variety: selectedVariety, customizations: pizza, price: calculateCurrentPizzaPrice() }]);
        setSelectedVariety(null);
        setPizza(defaultPizzaConfig);
        setView('menu');
        alert("Added to cart!");
    };

    const handleCheckout = async () => {
        const amount = calculateCartTotal();
        if (amount === 0) return;
        
        try {
            const { data: order } = await axios.post('http://localhost:5000/api/orders/create', { amount });
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_T0E01FHF370wco", // Paste your actual key here if env fails
                amount: order.amount,
                currency: "INR",
                name: "Pizza App",
                description: `Order`,
                order_id: order.id,
                handler: async function (response) {
                    const verifyRes = await axios.post('http://localhost:5000/api/orders/verify', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        customizations: cart, 
                        userId: actualUserId, 
                        amount: amount
                    });
                    if(verifyRes.data.success) {
                        alert("Payment Successful! Order sent to the kitchen.");
                        setCart([]); 
                        setView('orders');
                    }
                },
                theme: { color: "#ff6347" }
            };
            new window.Razorpay(options).open();
        } catch (error) { alert("Payment Failed"); }
    };

    // ==========================================
    // RENDER LOGIC
    // ==========================================

    if (view === 'orders') {
        return (
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                <button onClick={() => setView('menu')} style={{ background: 'transparent', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', marginBottom: '20px' }}>← Back to Menu</button>
                <h2>My Order History</h2>
                {myOrders.length === 0 ? <p>No orders placed yet.</p> : myOrders.map(order => (
                    <div key={order._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <strong>Order ID: {order._id}</strong>
                            <span style={{ fontWeight: 'bold', color: order.status === 'Sent to delivery' ? 'green' : 'orange' }}>Status: {order.status}</span>
                        </div>
                        <p style={{ margin: 0 }}>Total Paid: ₹{order.totalPrice}</p>
                        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{order.items?.length || 0} Pizza(s)</p>
                    </div>
                ))}
            </div>
        );
    }

    if (view === 'cart') {
        return (
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                <button onClick={() => setView('menu')} style={{ background: 'transparent', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>← Back to Menu</button>
                <h2>Your Cart</h2>
                {cart.length === 0 ? <p>Cart is empty.</p> : cart.map((item, index) => (
                    <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                        <h4>{index + 1}. {item.variety.name} - ₹{item.price}</h4>
                        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                            {item.customizations.base} | {item.customizations.sauce} | {item.customizations.cheese}
                        </p>
                        {item.customizations.veggies.length > 0 && (
                            <p style={{ margin: 0, fontSize: '14px', color: '#888' }}>+ {item.customizations.veggies.join(', ')}</p>
                        )}
                    </div>
                ))}
                <h3 style={{ marginTop: '20px' }}>Total: ₹{calculateCartTotal()}</h3>
                {cart.length > 0 && (
                    <button onClick={handleCheckout} style={{ background: '#ff6347', color: 'white', padding: '15px', border: 'none', width: '100%', cursor: 'pointer', fontSize: '16px', borderRadius: '5px' }}>Pay & Checkout</button>
                )}
            </div>
        );
    }

    if (view === 'builder') {
        return (
            <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', background: '#fafafa' }}>
                <button onClick={() => { setSelectedVariety(null); setView('menu'); }} style={{ background: 'transparent', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', marginBottom: '20px', padding: 0 }}>← Cancel & Back to Menu</button>
                
                <h2>Customizing: <span style={{ color: '#ff6347' }}>{selectedVariety.name}</span></h2>

                <div style={{ marginBottom: '15px' }}>
                    <label><strong>1. Choose Base:</strong> </label>
                    <select value={pizza.base} onChange={(e) => setPizza({...pizza, base: e.target.value})} style={{ padding: '5px', width: '100%', marginTop: '5px' }}>
                        <option value="Classic Hand Tossed">Classic Hand Tossed</option>
                        <option value="Thin Crust">Wheat Thin Crust</option>
                        <option value="Cheese Burst">Cheese Burst</option>
                        <option value="Pan Pizza">Pan Pizza</option>
                        <option value="Gluten Free">Gluten Free Base</option>
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label><strong>2. Choose Sauce:</strong> </label>
                    <select value={pizza.sauce} onChange={(e) => setPizza({...pizza, sauce: e.target.value})} style={{ padding: '5px', width: '100%', marginTop: '5px' }}>
                        <option value="Tomato Basil">Tomato Basil</option>
                        <option value="Spicy Garlic">Spicy Garlic</option>
                        <option value="Pesto">Pesto</option>
                        <option value="Barbeque">Barbeque</option>
                        <option value="White Garlic">White Garlic Sauce</option>
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label><strong>3. Select Cheese:</strong> </label>
                    <select value={pizza.cheese} onChange={(e) => setPizza({...pizza, cheese: e.target.value})} style={{ padding: '5px', width: '100%', marginTop: '5px' }}>
                        <option value="Mozzarella">Mozzarella</option>
                        <option value="Cheddar">Cheddar</option>
                        <option value="Vegan Cheese">Vegan Cheese</option>
                    </select>
                </div>

                {/* RESTORED VEGGIES */}
                <div style={{ marginBottom: '20px' }}>
                    <label><strong>4. Add Extra Veggies (₹30 each):</strong> </label><br/>
                    <div style={{ marginTop: '10px' }}>
                        {['Onion', 'Capsicum', 'Tomato', 'Jalapeno', 'Mushroom', 'Olives', 'Corn'].map(veggie => (
                            <label key={veggie} style={{ marginRight: '15px', display: 'inline-block', marginBottom: '8px' }}>
                                <input type="checkbox" value={veggie} checked={pizza.veggies.includes(veggie)} onChange={handleVeggieChange} /> {veggie}
                            </label>
                        ))}
                    </div>
                </div>

                <hr style={{ margin: '20px 0' }} />
                <h3 style={{ margin: '0 0 15px 0' }}>Item Price: ₹{calculateCurrentPizzaPrice()}</h3>
                
                <button onClick={handleAddToCart} style={{ background: '#4CAF50', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', width: '100%' }}>
                    Add to Cart
                </button>
            </div>
        );
    }

    // DEFAULT VIEW: MENU
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <h2>Welcome, {loggedInUser.name || 'User'}!</h2>
                <div>
                    <button onClick={() => setView('orders')} style={{ marginRight: '10px', padding: '10px 15px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' }}>📦 My Orders</button>
                    <button onClick={() => setView('cart')} style={{ marginRight: '10px', padding: '10px 15px', background: '#ffc107', cursor: 'pointer', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>🛒 Cart ({cart.length})</button>
                    <button onClick={handleLogout} style={{ padding: '10px 15px', background: 'red', color: 'white', cursor: 'pointer', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Logout</button>
                </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {pizzaVarieties.map(v => (
                    <div key={v.id} onClick={() => { setSelectedVariety(v); setView('builder'); }} style={{ border: '1px solid #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer', borderRadius: '10px', background: '#fefefe' }}>
                        <div style={{ fontSize: '40px' }}>{v.emoji}</div>
                        <h3 style={{ margin: '10px 0' }}>{v.name}</h3>
                        <p style={{ color: '#555', margin: 0 }}>Starting at ₹{v.basePrice}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PizzaBuilder;