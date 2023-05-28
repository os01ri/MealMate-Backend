const express=require("express");
const nutritionalController=require("../../controller/admin/nutritional");
const router=express.Router();

const getValidation=require("../../validation/admin/nutritional/get");

router.get("/user/nutritional",nutritionalController.getall).
get("/user/nutritional/:id",getValidation.get,nutritionalController.get)
module.exports=router;