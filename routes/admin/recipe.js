const express = require("express");
const recipeController = require("../../controller/admin/recipe");
const router = express.Router();
const Auth = require("../../middleware/Auth");
const permission = require("../../middleware/permission");

const storeValidation = require("../../validation/admin/recipe/store");
// const updateValidation=require("../../validation/admin/nutritional/update");
const getValidation = require("../../validation/admin/recipe/get");


router.post("/dashboard/recipe/store", Auth(process.env.ADMIN_TOKEN_KEY), permission("recipe"), storeValidation.store, recipeController.store).
    // put("/nutritional/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("nutritional"),updateValidation.update,nutritionalController.update).
    get("/dashboard/recipe/index", recipeController.getall).
    get("/dashboard/recipe/getunactive", recipeController.getunactive).
    post("/dashboard/recipe/:id/accept", getValidation.get, recipeController.accept).
    get("/dashboard/recipe/:id/show", getValidation.get, recipeController.get).
    delete("/dashboard/recipe/:id/destroy", Auth(process.env.ADMIN_TOKEN_KEY), permission("recipe"), getValidation.get, recipeController.delete)
module.exports = router;