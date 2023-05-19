const express=require("express");
const passwordController=require("../../controller/admin/password");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const sendmailValidation=require("../../validation/admin/password/sendmail");
const checkcode=require("../../validation/admin/password/checkcode");
const changepassword=require("../../validation/admin/password/changepassword");
router.post("/admin/sendemail",sendmailValidation.sendmail,passwordController.sendemail).
post("/admin/checkcode",Auth(process.env.ADMIN_RESET_TOKEN_KEY),checkcode.checkcode,passwordController.checkcode).
put("/admin/changepassword",Auth(process.env.ADMIN_TOKEN_KEY),changepassword.changepassword,passwordController.changepassword)
module.exports=router;