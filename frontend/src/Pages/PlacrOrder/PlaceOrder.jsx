import React, { useContext , useEffect, useState } from "react";
import "./PlaceOrder.css";
import { Storecontext } from "../../Context/storecontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { gettotalcatamt ,token,food_list,cartItem,url} = useContext(Storecontext);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:" ",
    city:" ",
    state:" ",
    zipcode:" ",
    country:"",
    phone:""
  })


  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  }

const placeOrder=async(event)=>{
  event.preventDefault();
  let orderItems=[];
  food_list.map((item)=>{
    if(cartItem[item._id]>0){
      let itemInfo=item;
      itemInfo["quantity"]=cartItem[item._id];
      orderItems.push(itemInfo);
    }
   
    
  })
  console.log( orderItems);
 let orderData={
  address:data,
  items:orderItems,
  amount:gettotalcatamt()+2,
 }
 let response =await axios.post(url+"/api/order/place",orderData,{headers:{token}})
 console.log(response.data);
 if(response.data.success){
  const {session_url}=response.data;
  window.location.replace(session_url);
 }
 else{
  alert("Error")
 }
  

}
const navigate=useNavigate();
useEffect(()=>{
if(!token){
navigate('/cart')
}
else if(gettotalcatamt()===0){
  navigate('/cart')
}
},[token])


  return (
    
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information </p>
          <div className="multi-filed">
            <input required  name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
            <input required  name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
          </div>
          <input required  name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder="Email" />
          <input required  name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
          <div className="multi-filed">
            <input required  name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
            <input required  name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
          </div>
          <div className="multi-filed">
            <input required  name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Pincode" />
            <input required  name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
          </div>
          <div className="multi-filed">
            <input required  name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
          </div>
        </div>
        <div className="rightside">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-detail">
                <p>Subtotal</p>
                <p>₹ {gettotalcatamt()}</p>
              </div>
              <hr />
              <div className="cart-total-detail">
                <p>Delivery Fee</p>
                <p>₹ {gettotalcatamt() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-detail">
                <b>Total</b>
                <b>₹ {gettotalcatamt() === 0 ? 0 : gettotalcatamt() + 2}</b>
              </div>
            </div>
            <button type='submit'>PROCEED TO Payment</button>
          </div>
        </div>
      </form>
    );
    
};

export default PlaceOrder;
