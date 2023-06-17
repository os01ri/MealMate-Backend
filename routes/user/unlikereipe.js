const express = require("express");
const unlikerecipeController = require("../../controller/user/unlikerecipe");
const router = express.Router();

const getValidation = require("../../validation/user/unlikerecipe/get");
const storeValidation = require("../../validation/user/unlikerecipe/store");
const Auth = require("../../middleware/Auth");

router.post("/user/unlikerecipe/store", Auth(process.env.USER_TOKEN_KEY), storeValidation.store, unlikerecipeController.store)
    .get("/user/unlikerecipe/index", Auth(process.env.USER_TOKEN_KEY), unlikerecipeController.getall).
    get("/user/unlikerecipe/:id/show", Auth(process.env.USER_TOKEN_KEY), getValidation.get, unlikerecipeController.show).
    delete("/user/unlikerecipe/:id/destroy", Auth(process.env.USER_TOKEN_KEY), getValidation.get, unlikerecipeController.destroy)

// get("/user/recipe/:id", Auth(process.env.USER_TOKEN_KEY), getValidation.get, recipeController.get).
// post("/user/recipe/store", Auth(process.env.USER_TOKEN_KEY), storeValidation.store, recipeController.storeByUser)
module.exports = router;