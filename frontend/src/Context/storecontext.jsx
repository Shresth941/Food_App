import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Storecontext = createContext(null);

const StorecontextProvider = (props) => {
  const [cartItem, setcartItem] = useState({});
  const url = "https://food-app-back-eh9z.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);

  const addTocart = async (itemId) => {
    if (!cartItem[itemId]) {
      setcartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})

    }
  };

  const removefromcart = async (itemId) => {
    setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})

    }
  };

  const gettotalcatamt = () => {
    let totalamt = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalamt += itemInfo.price * cartItem[item];
        }
      }
    }
    return totalamt;
  };

  const fetchFood_list = async () => {
    
      const response = await axios.get(url+"/api/food/list");
      setFood_list(response.data.data);
  }
    
    const loadCardData = async(token)=>{
      const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
      setcartItem(response.data.cartData);

    
  };



  useEffect(() => {
    async function loadData() {
      await fetchFood_list();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCardData(localStorage.getItem("token"))
      }
    }
    loadData();
  }, []);


  const contextValue = {
    food_list,
    cartItem,
    setcartItem,
    addTocart,
    removefromcart,
    gettotalcatamt,
    url,
    token,
    setToken,
  };

  return (
    <Storecontext.Provider value={contextValue}>
      {props.children}
    </Storecontext.Provider>
  );
  };

export default StorecontextProvider;
