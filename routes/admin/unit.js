const express=require("express");
const unitController=require("../../controller/admin/unit");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const permission=require("../../middleware/permission");
const storeValidation=require('../../validation/admin/unit/store');
const updateValidation=require('../../validation/admin/unit/update');
const getValidation=require('../../validation/admin/unit/get');

router.get("/dashboard/unit",unitController.getall).
get("/dashboard/unit/:id",getValidation.get,unitController.get)
module.exports=router;