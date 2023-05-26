const express=require("express");
const authController=require("../../controller/user/auth");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const alreadyVerfiedAccount=require("../../middleware/alreadyVerifyAccount");

const loginValidation=require("../../validation/admin/auth/login");
const registerValidation=require("../../validation/user/auth/register");
const refreshToken=require("../../middleware/refreshToken");


// const refreshToken=require("../../middleware/refreshToken");
router.post("/user/register",registerValidation.register,authController.register).
post("/user/verifyaccount",Auth(process.env.ADMIN_TOKEN_KEY),alreadyVerfiedAccount,authController.verify).
post("/user/login",loginValidation.login,authController.login).
post("/user/refreshtoken",refreshToken(process.env.USER_REFRESH_TOKEN_KEY),authController.refreshtoken).
post("/user/logout",Auth(process.env.USER_TOKEN_KEY),authController.logout)
module.exports=router;