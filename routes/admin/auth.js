const express=require("express");
const authController=require("../../controller/admin/auth");
const router=express.Router();
const loginValidation=require("../../validation/admin/auth/login");
const storeNotificationValidation=require("../../validation/admin/notification/store");


const refreshToken=require("../../middleware/refreshToken");
const Auth=require("../../middleware/Auth");
router.post("/dashboard/auth/login",loginValidation.login,authController.login).
post("/dashboard/auth/refreshtoken",refreshToken(process.env.ADMIN_REFRESH_TOKEN_KEY),authController.refreshtoken).
post("/dashboard/auth/logout",Auth(process.env.ADMIN_TOKEN_KEY),authController.logout).
post("/notification/store",Auth(process.env.ADMIN_TOKEN_KEY),storeNotificationValidation.store,authController.notificationStore).
get("/notification/get",authController.getallnotification);

module.exports=router;