import express from "express"
import authMiddleware from "../Middleware/auth.js"
import {listorders, placeOrder , updateStatus, userOrders, verifyOrder} from "../Controllers/OrderController.js";
const orderRourter =express.Router();
orderRourter.post("/place",authMiddleware,placeOrder);
orderRourter.post("/verify",verifyOrder);
orderRourter.post("/userOrders",authMiddleware,userOrders);
orderRourter.get("/list",listorders);
orderRourter.post("/status",updateStatus);


export default orderRourter;