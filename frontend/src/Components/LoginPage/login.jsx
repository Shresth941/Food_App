import React, { useState, useContext } from "react";
import "./login.css";
import { assets } from "../../assets/assets";
import { Storecontext } from "../../Context/Storecontext";
import axios from "axios";

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(Storecontext);
  const [currentState, setCurrentstate] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login/signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="Login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="loginpopuoinput">
          {currentState === "SignUp" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your Password"
            required
          />
        </div>
        <button type="submit">
          {currentState === "SignUp" ? "Create Account" : "Login"}
        </button>
        <div className="loginpopupcondition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        <div className="loginpopupcondition">
          {currentState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrentstate("SignUp")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrentstate("Login")}>Login here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
