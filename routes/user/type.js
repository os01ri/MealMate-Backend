const express=require("express");
const typeController=require("../../controller/admin/type");
const router=express.Router();

const getValidation=require("../../validation/admin/type/get");

router.get("/user/type",typeController.getall).
get("/user/type/:id",getValidation.get,typeController.get)
module.exports=router;