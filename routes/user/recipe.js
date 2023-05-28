const express=require("express");
const recipeController=require("../../controller/admin/recipe");
const router=express.Router();

const getValidation=require("../../validation/admin/recipe/get");
const storeValidation=require("../../validation/admin/recipe/store");
const Auth = require("../../middleware/Auth");

router.get("/user/recipe",recipeController.getalluser).
get("/user/recipe/getUserRecipe",Auth(process.env.USER_TOKEN_KEY),recipeController.getUserRecipe).
get("/user/recipe/getAllwithUserRecipe",Auth(process.env.USER_TOKEN_KEY),recipeController.getAllwithUserRecipe).

get("/user/recipe/:id",Auth(process.env.USER_TOKEN_KEY),getValidation.get,recipeController.get).
post("/user/recipe/store",Auth(process.env.USER_TOKEN_KEY),storeValidation.store,recipeController.storeByUser)
module.exports=router;