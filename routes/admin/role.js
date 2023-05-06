const express=require("express");
const roleController=require("../../controller/admin/role");
const router=express.Router();
const Auth=require("../../middleware/Auth");
router.post("/role/store",Auth(process.env.ADMIN_TOKEN_KEY),roleController.store).
put("/role/:id",Auth(process.env.ADMIN_TOKEN_KEY),roleController.update).
get("/role",Auth(process.env.ADMIN_TOKEN_KEY),roleController.getall).
get("/role/:id",Auth(process.env.ADMIN_TOKEN_KEY),roleController.get).
delete("/role/:id",Auth(process.env.ADMIN_TOKEN_KEY),roleController.delete)
module.exports=router;