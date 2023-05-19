const express=require("express");
const roleController=require("../../controller/admin/role");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const storeValidation=require("../../validation/admin/role/store");
const updateValidation=require("../../validation/admin/role/update");
const getValidation=require("../../validation/admin/role/get");
const permission = require("../../middleware/permission");


router.post("/role/store",Auth(process.env.ADMIN_TOKEN_KEY),permission("role"),storeValidation.store,roleController.store).
put("/role/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("role"),updateValidation.update,roleController.update).
get("/role",Auth(process.env.ADMIN_TOKEN_KEY),permission("role"),roleController.getall).
get("/role/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("role"),getValidation.get,roleController.get).
delete("/role/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("role"),getValidation.get,roleController.delete)
module.exports=router;