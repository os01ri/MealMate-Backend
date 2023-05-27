const express=require("express");
const unitController=require("../../controller/admin/unit");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const permission=require("../../middleware/permission");
const storeValidation=require('../../validation/admin/unit/store');
const updateValidation=require('../../validation/admin/unit/update');
const getValidation=require('../../validation/admin/unit/get');

router.post("/dashboard/unit/store",Auth(process.env.ADMIN_TOKEN_KEY),permission("unit"),storeValidation.store,unitController.store).
put("/dashboard/unit/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("unit"),updateValidation.update,unitController.update).
get("/dashboard/unit",unitController.getall).
get("/dashboard/unit/:id",getValidation.get,unitController.get).
delete("/dashboard/unit/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("unit"),getValidation.get,unitController.delete)
module.exports=router;