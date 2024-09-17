import express from 'express';
import cors from 'cors';
import { connectDb } from './Config/db.js';
import FoodRouter from './Routes/FoodRoute.js';
import UserRouter from './Routes/UserRoute.js';
import CartRouter from './Routes/CartRoute.js';
import 'dotenv/config'
import orderRourter from './Routes/OrderRoute.js';


// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDb()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
    // Add retry mechanism or more informative error message here
  });

// API endpoints
app.use("/api/food", FoodRouter);
app.use("/image", express.static('uploads'));
app.use("/api/user", UserRouter);
app.use("/api/cart", CartRouter);
app.use("/api/order",orderRourter);

app.get('/', (req, res) => {
  res.send('Hello, it\'s working!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});