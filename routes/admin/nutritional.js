const express=require("express");
const nutritionalController=require("../../controller/admin/nutritional");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const permission=require("../../middleware/permission");
router.post("/nutritional/store",Auth(process.env.ADMIN_TOKEN_KEY),permission("nutritional"),nutritionalController.store).
put("/nutritional/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("nutritional"),nutritionalController.update).
get("/nutritional",nutritionalController.getall).
get("/nutritional/:id",nutritionalController.get).
delete("/nutritional/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("nutritional"),nutritionalController.delete)
module.exports=router;