// import React, { useState } from 'react';
// import axios from 'axios';

// const Auth = ({ setLoggedInUser }) => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';

//         try {
//             const { data } = await axios.post(url, formData);
            
//             if (isLogin) {
//                 // Save token and user details to localStorage
//                 localStorage.setItem('token', data.token);
//                 localStorage.setItem('user', JSON.stringify(data.user));
//                 setLoggedInUser(data.user);
//                 alert(`Welcome back, ${data.user.name}! Logged in as: ${data.user.role}`);
//             } else {
//                 alert(data.message);
//                 setIsLogin(true); // Switch to login view after registering
//             }
//         } catch (error) {
//             alert(error.response?.data?.message || "An error occurred");
//         }
//     };

//     return (
//         <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
//             <h2>{isLogin ? 'Login' : 'Register'}</h2>
//             <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
//                 {!isLogin && (
//                     <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
//                 )}
                
//                 <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
//                 <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

//                 {!isLogin && (
//                     <label>
//                         <input type="checkbox" onChange={(e) => setFormData({...formData, role: e.target.checked ? 'admin' : 'user'})} />
//                         Register as Admin (For testing)
//                     </label>
//                 )}

//                 <button type="submit" style={{ padding: '10px', background: isLogin ? '#4CAF50' : '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>
//                     {isLogin ? 'Login' : 'Sign Up'}
//                 </button>
//             </form>

//             <p style={{ marginTop: '15px', cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => setIsLogin(!isLogin)}>
//                 {isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}
//             </p>
//         </div>
//     );
// };

// export default Auth;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPortal = ({ portalType }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    // Dynamically capitalize portalType (e.g., "admin" -> "Admin")
    const titleCaseRole = portalType.charAt(0).toUpperCase() + portalType.slice(1);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
        
        // Attach the specific portal role to the request
        const payload = { ...formData, role: portalType, requestedRole: portalType };

        try {
            const { data } = await axios.post(url, payload);
            
            if (isLogin) {
                localStorage.setItem('token', data.token);
                alert(`Welcome to the ${titleCaseRole} Dashboard!`);
                // Route them to their respective dashboard
                if (portalType === 'admin') {
                    navigate('/admin-dashboard'); 
                } else {
                    navigate('/dashboard'); 
                }
            } else {
                alert(data.message); // Instructs them to check email
                setIsLogin(true);
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    const handleForgotPassword = async () => {
        const email = prompt("Enter your email address to receive a password reset link:");
        if (!email) return;

        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            alert(data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Error sending reset email");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>{titleCaseRole} {isLogin ? 'Login' : 'Registration'}</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {!isLogin && (
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                )}
                
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

                <button type="submit" style={{ padding: '10px', background: isLogin ? '#4CAF50' : '#2196F3', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <p style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', margin: 0 }} onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}
                </p>
                
                {isLogin && (
                    <p style={{ cursor: 'pointer', color: 'red', textDecoration: 'underline', margin: 0 }} onClick={handleForgotPassword}>
                        Forgot Password?
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthPortal;