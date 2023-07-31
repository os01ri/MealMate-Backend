const express = require("express");
const recipeController = require("../../controller/admin/recipe");
const router = express.Router();

const getValidation = require("../../validation/admin/recipe/get");
const storeValidation = require("../../validation/admin/recipe/store");
const Auth = require("../../middleware/Auth");

router.get("/user/recipe/index", recipeController.getalluser).
    get("/user/recipe/indextrending", Auth(process.env.USER_TOKEN_KEY),recipeController.indextrending).
    get("/user/recipe/indexmostordered",Auth(process.env.USER_TOKEN_KEY), recipeController.indextrending).
    post("/user/recipe/storerate",Auth(process.env.USER_TOKEN_KEY), recipeController.storerate).

    get("/user/recipe/getUserRecipe", Auth(process.env.USER_TOKEN_KEY), recipeController.getUserRecipe).
    get("/user/recipe/indexbyfollow", Auth(process.env.USER_TOKEN_KEY), recipeController.indexbyfollow).
    get("/user/recipe/indexrestriction", Auth(process.env.USER_TOKEN_KEY), recipeController.indexrestriction).

    get("/user/recipe/getAllwithUserRecipe", Auth(process.env.USER_TOKEN_KEY), recipeController.getAllwithUserRecipe).

    get("/user/recipe/:id/show", Auth(process.env.USER_TOKEN_KEY), getValidation.get, recipeController.get).
    post("/user/recipe/store", Auth(process.env.USER_TOKEN_KEY), storeValidation.store, recipeController.storeByUser)
module.exports = router;