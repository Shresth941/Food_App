import React, { useContext, useEffect } from 'react';
import './verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Storecontext } from '../Context/storecontext';
import axios from 'axios'; // Make sure axios is imported

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(Storecontext);
    const navigate = useNavigate();

    const verifyPayment = async () => {  // Proper async function declaration
        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate("/"); // Navigate to homepage on error
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);  // Missing closing bracket fixed

    return (
        <div className='Verify'>
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
