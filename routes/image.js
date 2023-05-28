const express=require("express");
const storage=require("../config/fileSystem");
const router=express.Router();
const imageController=require("../controller/image");
// const imageValidation=require("../validation/image");
// const Temp=require("../models/temp");
router.post("/addimage",storage.array("image"),imageController.addImage)


module.exports=router;