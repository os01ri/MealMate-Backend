const express=require("express");
const categoryController=require("../../controller/admin/category");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const permission=require("../../middleware/permission");
const storeValidation=require("../../validation/admin/category/store");
const updateValidation=require("../../validation/admin/category/update");
const getValidation=require("../../validation/admin/category/get");


router.post("/category/store",Auth(process.env.ADMIN_TOKEN_KEY),permission("category"),storeValidation.store,categoryController.store).
put("/category/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("category"),updateValidation.update,categoryController.update).
get("/category",categoryController.getall).
get("/category/:id",getValidation.get,categoryController.get).
delete("/category/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("category"),getValidation.get,categoryController.delete)
module.exports=router;