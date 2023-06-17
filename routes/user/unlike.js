const express = require("express");
const unlikeController = require("../../controller/user/unlike");
const router = express.Router();

const getValidation = require("../../validation/user/unlike/get");
const storeValidation = require("../../validation/user/unlike/store");
const Auth = require("../../middleware/Auth");

router.post("/user/unlikeingredient/store", Auth(process.env.USER_TOKEN_KEY), storeValidation.store, unlikeController.store)
    .get("/user/unlikeingredient/index", Auth(process.env.USER_TOKEN_KEY), unlikeController.getall).
    get("/user/unlikeingredient/:id/show", Auth(process.env.USER_TOKEN_KEY), getValidation.get, unlikeController.show).
    delete("/user/unlikeingredient/:id/destroy", Auth(process.env.USER_TOKEN_KEY), getValidation.get, unlikeController.destroy)

// get("/user/recipe/:id", Auth(process.env.USER_TOKEN_KEY), getValidation.get, recipeController.get).
// post("/user/recipe/store", Auth(process.env.USER_TOKEN_KEY), storeValidation.store, recipeController.storeByUser)
module.exports = router;