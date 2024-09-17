import foodmodel from "../Models/Food_model.js";
import fs from 'fs';
//add food item
const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const food = new foodmodel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error", error: error.message });
    }
};

// All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodmodel.find({});
        res.json({ success: true, data:foods });
    } catch (error) {
        console.log(error);
        res.json( {sucess:false,message:"Error"});
    }
};


//remove item 
const removeFood = async (req, res) => {
    try {
    const food =await foodmodel.findById(req.body.id);
    if (!food) {
        return res.status(404).json({ success: false, message: "Food item not found" });
    }
    fs.unlink('uploads/${food.image}',()=>{})


    await foodmodel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})

    
}

}

export { addFood, listFood , removeFood};
