import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDash = ({ orderId }) => {
    const [status, setStatus] = useState('Loading...');

    useEffect(() => {
        const fetchStatus = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
            setStatus(data.status);
        };

        fetchStatus(); // Initial fetch
        const interval = setInterval(fetchStatus, 5000); // Poll every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [orderId]);

    return (
        <div>
            <h3>Order Status</h3>
            <p>Current Status: <strong>{status}</strong></p>
        </div>
    );
};

export default UserDash;