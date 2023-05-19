const express=require("express");
const passwordController=require("../../controller/user/password");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const sendmailValidation=require("../../validation/user/password/sendemail");
const checkcode=require("../../validation/user/password/checkcode");
const changepassword=require("../../validation/user/password/changepassword");

router.post("/user/sendemail",sendmailValidation.sendmail,passwordController.sendemail).
post("/user/checkcode",Auth(process.env.USER_RESET_TOKEN_KEY),checkcode.checkcode,passwordController.checkcode).
put("/user/changepassword",Auth(process.env.USER_TOKEN_KEY),changepassword.changepassword,passwordController.changepassword)
module.exports=router;