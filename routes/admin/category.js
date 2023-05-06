const express=require("express");
const categoryController=require("../../controller/admin/category");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const permission=require("../../middleware/permission");
router.post("/category/store",Auth(process.env.ADMIN_TOKEN_KEY),permission("category"),categoryController.store).
put("/category/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("category"),categoryController.update).
get("/category",categoryController.getall).
get("/category/:id",categoryController.get).
delete("/category/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("category"),categoryController.delete)
module.exports=router;