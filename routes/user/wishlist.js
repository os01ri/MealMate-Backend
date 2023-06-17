const express = require("express");
const wishlistController = require("../../controller/user/wishlist");
const router = express.Router();
const Auth = require("../../middleware/Auth");
const addtowishlistValidation = require("../../validation/user/wishlist/addtowishlist");
const deleteValidation = require("../../validation/user/wishlist/delete");

// const checkcode=require("../../validation/user/password/checkcode");
// const changepassword=require("../../validation/user/password/changepassword");

router.post("/user/wishlist/store", addtowishlistValidation.addtowishlist, Auth(process.env.USER_TOKEN_KEY), wishlistController.addtowishlist).
    get("/user/wishlist/index", Auth(process.env.USER_TOKEN_KEY), wishlistController.getall).
    delete("/user/wishlist/:id/destroy", Auth(process.env.USER_TOKEN_KEY), deleteValidation.delete, wishlistController.delete)
// post("/user/checkcode",Auth(process.env.USER_RESET_TOKEN_KEY),checkcode.checkcode,passwordController.checkcode).
// put("/user/changepassword",Auth(process.env.USER_TOKEN_KEY),changepassword.changepassword,passwordController.changepassword)
module.exports = router;