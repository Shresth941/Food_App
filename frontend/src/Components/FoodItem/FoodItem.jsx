import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { Storecontext } from "../../Context/storecontext";

const FoodItem = ({ id, name, price, description, image}) => {
 
  const { cartItem,addTocart,removefromcart,url } = useContext(Storecontext);
  return (
    <div className="fooditem">
      <div className="fooditemimagecontainer">
        <img className="fooditemimage" src={url+"/image/"+image} alt="" />
        {!cartItem[id]
        ? (
          <img
            className="add"
            onClick={() => addTocart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="fooditemcounter">
            <img
              onClick={() => removefromcart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItem[id]}</p>
            <img
              onClick={() =>addTocart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="fooditeminfo">
        <div className="fooditemrating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="fooditemdescription">{description}</p>
        <p className="fooditemprice">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
