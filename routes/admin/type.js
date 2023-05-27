const express=require("express");
const typeController=require("../../controller/admin/type");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const permission=require("../../middleware/permission");
const storeValidation=require('../../validation/admin/type/store');
const updateValidation=require('../../validation/admin/type/update');
const getValidation=require('../../validation/admin/type/get');

router.post("/dashboard/type/store",Auth(process.env.ADMIN_TOKEN_KEY),permission("type"),storeValidation.store,typeController.store).
put("/dashboard/type/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("type"),updateValidation.update,typeController.update).
get("/dashboard/type",typeController.getall).
get("/dashboard/type/:id",getValidation.get,typeController.get).
delete("/dashboard/type/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("type"),getValidation.get,typeController.delete)
module.exports=router;