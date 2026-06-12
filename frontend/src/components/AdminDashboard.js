// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//     const [orders, setOrders] = useState([]);
//     const [inventory, setInventory] = useState([]);

//     const fetchData = async () => {
//         try {
//             const [orderRes, invRes] = await Promise.all([
//                 axios.get('http://localhost:5000/api/admin/orders'),
//                 axios.get('http://localhost:5000/api/admin/inventory')
//             ]);
//             setOrders(orderRes.data);
//             setInventory(invRes.data);
//         } catch (error) {
//             console.error("Error fetching admin data", error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleStatusChange = async (orderId, newStatus) => {
//         try {
//             await axios.put(`http://localhost:5000/api/admin/orders/${orderId}/status`, { status: newStatus });
//             fetchData(); 
//         } catch (error) {
//             alert("Failed to update status");
//         }
//     };

//     const handleInventoryChange = async (itemId, currentQty, change) => {
//         const newQty = currentQty + change;
//         if (newQty < 0) return;
//         try {
//             await axios.put(`http://localhost:5000/api/admin/inventory/${itemId}`, { quantity: newQty });
//             fetchData(); 
//         } catch (error) {
//             alert("Failed to update inventory");
//         }
//     };

//     const seedDatabase = async () => {
//         await axios.post('http://localhost:5000/api/admin/seed-inventory');
//         fetchData();
//         alert("Dummy inventory loaded!");
//     };

//     return (
//         <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
//             <h1>Admin Dashboard</h1>
//             <hr />

//             {/* INVENTORY SECTION */}
//             <div style={{ marginBottom: '40px' }}>
//                 <h2>📦 Inventory Management</h2>
                
//                 {/* Safe check for inventory length */}
//                 {(inventory?.length || 0) === 0 && (
//                     <button onClick={seedDatabase} style={{ padding: '10px', background: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>
//                         Load Initial Inventory Data
//                     </button>
//                 )}
                
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
//                     {(inventory || []).map(item => (
//                         <div key={item._id} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '5px', background: item.quantity <= item.threshold ? '#ffebee' : '#f9f9f9' }}>
//                             <strong style={{ display: 'block', marginBottom: '10px' }}>{item.item}</strong>
//                             <p style={{ margin: '0 0 10px 0', color: '#666' }}>Category: {item.category}</p>
//                             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                 <button onClick={() => handleInventoryChange(item._id, item.quantity, -1)} style={{ padding: '5px 10px', cursor: 'pointer' }}>-</button>
//                                 <span style={{ fontWeight: 'bold', color: item.quantity <= item.threshold ? 'red' : 'black' }}>{item.quantity}</span>
//                                 <button onClick={() => handleInventoryChange(item._id, item.quantity, 1)} style={{ padding: '5px 10px', cursor: 'pointer' }}>+</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* ORDERS SECTION */}
//             <div>
//                 <h2>🧾 Recent Orders</h2>
//                 {(orders || []).map(order => (
//                     <div key={order._id} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '15px', background: '#fff' }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
//                             <strong>Order ID: {order._id}</strong>
//                             <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>₹{order.totalPrice}</span>
//                         </div>
                        
//                         {/* Added optional chaining (?.) so old records don't crash the app */}
//                         <p style={{ margin: '0 0 10px 0' }}>Items: {order.items?.length || 0} pizza(s)</p>
                        
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//                             <label><strong>Status:</strong></label>
//                             <select 
//                                 value={order.status} 
//                                 onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                                 style={{ padding: '5px', fontWeight: 'bold', color: order.status === 'Sent to delivery' ? 'green' : 'black' }}
//                             >
//                                 <option value="Received">Received</option>
//                                 <option value="In the kitchen">In the kitchen</option>
//                                 <option value="Sent to delivery">Sent to delivery</option>
//                             </select>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [inventory, setInventory] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const [orderRes, invRes] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/orders'),
                axios.get('http://localhost:5000/api/admin/inventory')
            ]);
            setOrders(orderRes.data);
            setInventory(invRes.data);
        } catch (error) {
            console.error("Error fetching admin data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/orders/${orderId}/status`, { status: newStatus });
            fetchData(); // Refresh the list to show the new status
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const handleInventoryChange = async (itemId, currentQty, change) => {
        const newQty = currentQty + change;
        if (newQty < 0) return; // Prevent negative stock
        try {
            await axios.put(`http://localhost:5000/api/admin/inventory/${itemId}`, { quantity: newQty });
            fetchData(); // Refresh the list
        } catch (error) {
            alert("Failed to update inventory");
        }
    };

    const seedDatabase = async () => {
        try {
            await axios.post('http://localhost:5000/api/admin/seed-inventory');
            fetchData();
            alert("Dummy inventory loaded!");
        } catch (error) {
            alert("Error loading dummy inventory");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Admin Dashboard</h1>
                <button 
                    onClick={handleLogout} 
                    style={{ padding: '10px 20px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Logout
                </button>
            </div>
            <hr />

            {/* INVENTORY SECTION */}
            <div style={{ marginBottom: '40px' }}>
                <h2>📦 Inventory Management</h2>
                
                {/* Safe check for inventory length. Shows button if db is empty. */}
                {(inventory?.length || 0) === 0 && (
                    <button onClick={seedDatabase} style={{ padding: '10px', background: '#2196F3', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
                        Load Initial Inventory Data
                    </button>
                )}
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
                    {(inventory || []).map(item => (
                        <div key={item._id} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '5px', background: item.quantity <= item.threshold ? '#ffebee' : '#f9f9f9' }}>
                            <strong style={{ display: 'block', marginBottom: '10px' }}>{item.item}</strong>
                            <p style={{ margin: '0 0 10px 0', color: '#666' }}>Category: {item.category}</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <button onClick={() => handleInventoryChange(item._id, item.quantity, -1)} style={{ padding: '5px 15px', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                                <span style={{ fontWeight: 'bold', color: item.quantity <= item.threshold ? 'red' : 'black', fontSize: '18px' }}>
                                    {item.quantity}
                                </span>
                                <button onClick={() => handleInventoryChange(item._id, item.quantity, 1)} style={{ padding: '5px 15px', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ORDERS SECTION */}
            <div>
                <h2>🧾 Recent Orders</h2>
                {(orders || []).map(order => (
                    <div key={order._id} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '15px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <strong>Order ID: {order._id}</strong>
                            <span style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: '18px' }}>₹{order.totalPrice}</span>
                        </div>
                        
                        {/* Optional chaining (?.) so old records don't crash the app */}
                        <p style={{ margin: '0 0 10px 0', color: '#555' }}>Items: {order.items?.length || 0} pizza(s)</p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <label><strong>Status:</strong></label>
                            <select 
                                value={order.status} 
                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                style={{ padding: '8px', fontWeight: 'bold', borderRadius: '4px', color: order.status === 'Sent to delivery' ? 'green' : 'black' }}
                            >
                                <option value="Received">Received</option>
                                <option value="In the kitchen">In the kitchen</option>
                                <option value="Sent to delivery">Sent to delivery</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;