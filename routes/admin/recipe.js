const express=require("express");
const recipeController=require("../../controller/admin/recipe");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const permission=require("../../middleware/permission");

const storeValidation=require("../../validation/admin/recipe/store");
// const updateValidation=require("../../validation/admin/nutritional/update");
const getValidation=require("../../validation/admin/recipe/get");


router.post("/dashboard/recipe/store",Auth(process.env.ADMIN_TOKEN_KEY),permission("recipe"),storeValidation.store,recipeController.store).
// put("/nutritional/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("nutritional"),updateValidation.update,nutritionalController.update).
get("/dashboard/recipe",recipeController.getall).
get("/dashboard/recipe/:id",getValidation.get,recipeController.get).
delete("/dashboard/recipe/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("recipe"),getValidation.get,recipeController.delete)
module.exports=router;