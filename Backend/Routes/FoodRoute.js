import express from "express";
import { addFood, listFood, removeFood } from "../Controllers/Foodcontroller.js";
import multer from "multer";

const Foodrouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

Foodrouter.post("/add", upload.single("image"), addFood);
Foodrouter.get("/list", listFood);
Foodrouter.post("/remove", removeFood);0

export default Foodrouter;
