const express = require("express");
const followController = require("../../controller/user/follow");
const router = express.Router();
const Auth = require("../../middleware/Auth");
const storeValidation = require("../../validation/user/follow/store");
// const updateValidation = require("../../validation/user/grocery/update");

// const deleteValidation = require("../../validation/user/grocery/get");

router.post("/user/follow/store", storeValidation.store, Auth(process.env.USER_TOKEN_KEY), followController.store).
    post("/user/follow/unfollow", Auth(process.env.USER_TOKEN_KEY), followController.unfollow);
    // delete("/user/grocery/:id/destroy", Auth(process.env.USER_TOKEN_KEY), deleteValidation.get, groceryController.delete).
    // put("/user/grocery/:id/update", Auth(process.env.USER_TOKEN_KEY), updateValidation.update, groceryController.update)

// delete("/user/wishlist/:id",Auth(process.env.USER_TOKEN_KEY),deleteValidation.delete,wishlistController.delete)
// post("/user/checkcode",Auth(process.env.USER_RESET_TOKEN_KEY),checkcode.checkcode,passwordController.checkcode).
// put("/user/changepassword",Auth(process.env.USER_TOKEN_KEY),changepassword.changepassword,passwordController.changepassword)
module.exports = router;