import React, { useContext, useEffect, useState } from "react";
import "./Myorders.css";
import { Storecontext } from "../../Context/storecontext";
import axios from "axios";
import { assets } from "../../assets/assets";

const Myorders = () => {
  const { url, token } = useContext(Storecontext);
  const [data, setData] = useState([]);

  const fetchorders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchorders();
    }
  }, [token]);

  return (
    <>
      <div className="Myorders">
        <h2>My Orders</h2>
      
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="Myorders-orders">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantity + ",";
                  }
                })}
              </p>
              <p>₹{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{order.status}</b>
              </p>
              <button  onClick={fetchorders}>Track Order</button>
            </div>
          );
        })}
      </div>
      </div>
    </>
  );
};

export default Myorders;
