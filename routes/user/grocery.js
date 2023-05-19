const express=require("express");
const groceryController=require("../../controller/user/grocery");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const storeValidation=require("../../validation/user/grocery/store");
// const deleteValidation=require("../../validation/user/wishlist/delete");

router.post("/user/grocery/store",storeValidation.store,Auth(process.env.USER_TOKEN_KEY),groceryController.store).
get("/user/grocery",Auth(process.env.USER_TOKEN_KEY),groceryController.getall).
delete("/user/grocery/:id",Auth(process.env.USER_TOKEN_KEY),groceryController.delete).
put("/user/grocery/:id",Auth(process.env.USER_TOKEN_KEY),groceryController.update)

// delete("/user/wishlist/:id",Auth(process.env.USER_TOKEN_KEY),deleteValidation.delete,wishlistController.delete)
// post("/user/checkcode",Auth(process.env.USER_RESET_TOKEN_KEY),checkcode.checkcode,passwordController.checkcode).
// put("/user/changepassword",Auth(process.env.USER_TOKEN_KEY),changepassword.changepassword,passwordController.changepassword)
module.exports=router;