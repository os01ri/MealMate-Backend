const express = require("express");
const roleController = require("../../controller/admin/role");
const router = express.Router();
const Auth = require("../../middleware/Auth");
const storeValidation = require("../../validation/admin/role/store");
const updateValidation = require("../../validation/admin/role/update");
const getValidation = require("../../validation/admin/role/get");
const isSuperAdmin = require("../../middleware/isSuperAdmin");


router.post("/dashboard/role/store", Auth(process.env.ADMIN_TOKEN_KEY), isSuperAdmin, storeValidation.store, roleController.store).
    put("/dashboard/role/:id/update", Auth(process.env.ADMIN_TOKEN_KEY), isSuperAdmin, updateValidation.update, roleController.update).
    get("/dashboard/role/index", Auth(process.env.ADMIN_TOKEN_KEY), isSuperAdmin, roleController.getall).
    get("/dashboard/getAllPermission", Auth(process.env.ADMIN_TOKEN_KEY), isSuperAdmin, roleController.getAllPermission).
    get("/dashboard/role/:id/show", Auth(process.env.ADMIN_TOKEN_KEY), isSuperAdmin, getValidation.get, roleController.get).
    delete("/dashboard/role/:id/destroy", Auth(process.env.ADMIN_TOKEN_KEY), isSuperAdmin, getValidation.get, roleController.delete)
module.exports = router;