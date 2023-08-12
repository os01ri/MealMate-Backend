const express = require("express");
const likerecipeController = require("../../controller/user/likerecipe");
const router = express.Router();
const Auth = require("../../middleware/Auth");
const likerecipestoreValidation = require("../../validation/user/likerecipe/store");
const deleteValidation = require("../../validation/user/likerecipe/delete");


router.post("/user/likerecipe/store", likerecipestoreValidation.store, Auth(process.env.USER_TOKEN_KEY), likerecipeController.store).
    get("/user/likerecipe/index", Auth(process.env.USER_TOKEN_KEY), likerecipeController.getall).
    delete("/user/likerecipe/:id/destroy", Auth(process.env.USER_TOKEN_KEY), deleteValidation.delete, likerecipeController.delete);
module.exports = router;