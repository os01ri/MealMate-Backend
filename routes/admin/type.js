const express=require("express");
const typeController=require("../../controller/admin/type");
const router=express.Router();
const Auth=require("../../middleware/Auth");
const permission=require("../../middleware/permission");
router.post("/type/store",Auth(process.env.ADMIN_TOKEN_KEY),permission("type"),typeController.store).
put("/type/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("type"),typeController.update).
get("/type",typeController.getall).
get("/type/:id",typeController.get).
delete("/type/:id",Auth(process.env.ADMIN_TOKEN_KEY),permission("type"),typeController.delete)
module.exports=router;