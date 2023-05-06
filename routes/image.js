const express=require("express");
const storage=require("../config/fileSystem");
const router=express.Router();
const imageController=require("../controller/image");
// const imageValidation=require("../validation/image");
// const Temp=require("../models/temp");
router.post("/addimage",storage.array("image"),imageController.addImage)


// router.get("/temp",async(req,res)=>{

//     let temps=await Temp.find({})
//     res.status(200).json(temps)

// })

module.exports=router;