import React, { useEffect, useState } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/admin_assets/assets';

const url = 'https://food-app-back-eh9z.onrender.com';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Error');
      }
    } catch (error) {
      toast.error('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  const statusHandler=async(event,orderId)=>{
   const response =await axios.post(url+"/api/order/status",{
    orderId,
    status:event.target.value
   }) 
   if(response.data.success)
   {
    await fetchAllOrders();
   }

  }

  return (
    
    <div className="Order" style={{ marginLeft: '15px' }}>
      <h3>Order Page</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="Order-item-food">
                  {order.items.map((item, itemIndex) => (
                    <span key={itemIndex}>
                      {item.name} x {item.quantity}
                      {itemIndex === order.items.length - 1 ? '' : ', '}
                    </span>
                  ))}
                </p>
                <p className="order-item-name">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className="order-item-addesss">
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
                <div>
                  <p>
                    Items: {order.items.length}
                  </p>
                  <p>₹{order.amount}</p>
                  <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    
  );
};

export default Order;
