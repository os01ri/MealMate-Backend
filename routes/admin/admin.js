const express = require("express");
const adminController = require("../../controller/admin/admin");
const router = express.Router();
const storeValidation = require("../../validation/admin/admin/store");
const Auth = require("../../middleware/Auth");

// const refreshToken=require("../../middleware/refreshToken");
const isSuperAdmin = require("../../middleware/isSuperAdmin");
router.post("/dashboard/admin/store", storeValidation.store, Auth(process.env.ADMIN_TOKEN_KEY), isSuperAdmin, adminController.store).
    get("/dashboard/admin/index", Auth(process.env.ADMIN_TOKEN_KEY), isSuperAdmin, adminController.getAllAdmin).
    get("/dashboard/admin/:id/show", Auth(process.env.ADMIN_TOKEN_KEY), isSuperAdmin, adminController.get).
    delete("/dashboard/admin/:id/destroy", Auth(process.env.ADMIN_TOKEN_KEY), isSuperAdmin, adminController.delete)
module.exports = router;