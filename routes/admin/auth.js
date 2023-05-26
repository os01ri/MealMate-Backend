const express=require("express");
const authController=require("../../controller/admin/auth");
const router=express.Router();
const loginValidation=require("../../validation/admin/auth/login");

const refreshToken=require("../../middleware/refreshToken");
const Auth=require("../../middleware/Auth");
router.post("/admin/login",loginValidation.login,authController.login).
post("/admin/refreshtoken",refreshToken(process.env.ADMIN_REFRESH_TOKEN_KEY),authController.refreshtoken).
post("/admin/logout",Auth(process.env.ADMIN_TOKEN_KEY),authController.logout)
module.exports=router;