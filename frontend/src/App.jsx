import React, { useState } from 'react'
import Navbar from './Components/Navbar/navbar' 
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './Pages/PlacrOrder/PlaceOrder'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Footer from './Components/Footer/Footer'
import Login from "./Components/LoginPage/login"
import Verify from './Pages/Verify'
import Myorders from './Pages/myOrders/Myorders'

const App = () => {
     const[showLogin,setShowLogin]= useState(false)
  return (
    <>
    {showLogin ? <Login setShowLogin={setShowLogin} />:<></>}


    <div className='App'>
      <Navbar setShowLogin={setShowLogin}  />
      <Routes>
      <Route path='/'    element={<Home/>}/>
      <Route path='/cart'    element={<Cart/>}/>
      <Route path='/PlaceOrder'    element={<PlaceOrder/>}/>
      <Route path ='/verify'    element={<Verify/>}/>
      <Route path ='/myorders'   element={<Myorders/>}/>
   
      </Routes>
     
      
    </div>
    <Footer/>
    </>
  )
}

export default App
