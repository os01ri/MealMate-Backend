const express=require("express");
const nutritionalController=require("../../controller/admin/nutritional");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const permission=require("../../middleware/permission");

const storeValidation=require("../../validation/admin/nutritional/store");
const updateValidation=require("../../validation/admin/nutritional/update");
const getValidation=require("../../validation/admin/nutritional/get");


router.post("/nutritional/store",Auth(process.env.ADMIN_TOKEN_KEY),permission("nutritional"),storeValidation.store,nutritionalController.store).
put("/nutritional/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("nutritional"),updateValidation.update,nutritionalController.update).
get("/nutritional",nutritionalController.getall).
get("/nutritional/:id",getValidation.get,nutritionalController.get).
delete("/nutritional/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("nutritional"),getValidation.get,nutritionalController.delete)
module.exports=router;