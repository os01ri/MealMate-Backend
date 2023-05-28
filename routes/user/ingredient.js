const express=require("express");
const ingredientController=require("../../controller/admin/ingredient");
const router=express.Router();

const getValidation=require("../../validation/admin/ingredient/get");

router.get("/user/ingredient",ingredientController.getall).
get("/user/ingredient/:id",getValidation.get,ingredientController.get)
module.exports=router;