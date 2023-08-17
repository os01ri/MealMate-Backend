const express = require("express");
const authController = require("../../controller/user/auth");
const router = express.Router();
const Auth = require("../../middleware/Auth");
const alreadyVerfiedAccount = require("../../middleware/alreadyVerifyAccount");

const loginValidation = require("../../validation/user/auth/login");
const updateprofileValidation = require("../../validation/user/auth/updateprofile");

const registerValidation = require("../../validation/user/auth/register");
const refreshToken = require("../../middleware/refreshToken");


// const refreshToken=require("../../middleware/refreshToken");
router.post("/user/auth/register", registerValidation.register, authController.register).
    post("/user/auth/verifyaccount", Auth(process.env.USER_TOKEN_KEY), alreadyVerfiedAccount, authController.verify).
    post("/user/auth/login", loginValidation.login, authController.login).
    put("/user/updateprofile",Auth(process.env.USER_TOKEN_KEY),updateprofileValidation.updateprofile, authController.updateprofile).

    get("/user/showuserinfo",Auth(process.env.USER_TOKEN_KEY), authController.showuserinfo).

    post("/user/auth/refreshtoken", refreshToken(process.env.USER_REFRESH_TOKEN_KEY), authController.refreshtoken).
    post("/user/auth/logout", Auth(process.env.USER_TOKEN_KEY), authController.logout)
module.exports = router;