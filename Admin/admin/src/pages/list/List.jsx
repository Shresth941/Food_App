import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import "./List.css";
const url = "https://food-app-back-eh9z.onrender.com";
const List = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
 

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        setError("Error fetching list");
      }
    } catch (error) {
      setError(`Error fetching list: ${error.message}`);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      await fetchList();
      if (response.data.success) {
        toast.success("Food removed successfully");
      } else {
        toast.error("Failed to remove food");
      }
    } catch (error) {
      setError(`Error removing food: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="List add flex-col">
      <p>All food list</p>
      <div className="list-table">
        <div className="list-table-formate title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={item.id || index} className="list-table-formate">
            <img src={`${url}/image/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">
              <FaTrashAlt />
            </p>
          </div>
        ))}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default List;
