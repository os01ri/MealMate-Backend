const express=require("express");
const ingredientController=require("../../controller/admin/ingredient");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const permission=require("../../middleware/permission");
router.post("/ingredient/store",Auth(process.env.ADMIN_TOKEN_KEY),permission("ingredient"),ingredientController.store).
put("/ingredient/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("ingredient"),ingredientController.update).
get("/ingredient",ingredientController.getall).
get("/ingredient/:id",ingredientController.get).
delete("/ingredient/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("ingredient"),ingredientController.delete)
module.exports=router;