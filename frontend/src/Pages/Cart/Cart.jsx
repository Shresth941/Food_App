import React, { useContext } from "react";
import "./Cart.css";
import { Storecontext } from "../../Context/storecontext";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, food_list, removefromcart, gettotalcatamt ,url} =
    useContext(Storecontext); // Use 'cartItem' here
  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItem[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/image/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>₹{item.price * cartItem[item._id]}</p>
                  <MdDeleteForever
                    className="cross"
                    onClick={() => removefromcart(item._id)}
                  />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bootom">
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
          <button onClick={() => navigate("/PlaceOrder")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If You have a promocode enter here.</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promocode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
