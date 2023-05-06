const express=require("express");
const passwordController=require("../../controller/admin/password");
const router=express.Router();
const Auth=require("../../middleware/Auth");


router.post("/admin/sendemail",passwordController.sendemail).
post("/admin/checkcode",Auth(process.env.ADMIN_RESET_TOKEN_KEY),passwordController.checkcode).
put("/admin/changepassword",Auth(process.env.ADMIN_TOKEN_KEY),passwordController.changepassword)
// const loginValidation=require("../../validation/admin/auth/login");
// const refreshToken=require("../../middleware/refreshToken");
// // const Auth=require("../../middleware/Auth");
// router.post("/admin/login",loginValidation.login,authController.login).
// post("/admin/refreshtoken",refreshToken(process.env.ADMIN_REFRESH_TOKEN_KEY),authController.refreshtoken).
// post("/admin/logout",Auth(process.env.ADMIN_TOKEN_KEY),authController.logout)
module.exports=router;