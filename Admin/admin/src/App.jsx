import React from "react";
import Navbar from "./component/Navbar/navbar";
import Sidebar from "./component/sidebar/sidebar";
import { Routes, Route } from 'react-router-dom';
import Add from "./pages/add/Add";
import List from "./pages/list/List";
import Order from "./pages/order/Order";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url ="http://localhost:4000";
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/Add" element={<Add url={url}/>} />
          <Route path="/List" element={<List url={url}/>} />
          <Route path="/Order" element={<Order url={url}/>} />
        </Routes>
        
      </div>
    </div>
  );
};

export default App;
