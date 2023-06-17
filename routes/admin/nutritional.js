const express = require("express");
const nutritionalController = require("../../controller/admin/nutritional");
const router = express.Router();
const Auth = require("../../middleware/Auth");
const permission = require("../../middleware/permission");

const storeValidation = require("../../validation/admin/nutritional/store");
const updateValidation = require("../../validation/admin/nutritional/update");
const getValidation = require("../../validation/admin/nutritional/get");


router.post("/dashboard/nutritional/store", Auth(process.env.ADMIN_TOKEN_KEY), permission("nutritional"), storeValidation.store, nutritionalController.store).
    put("/dashboard/nutritional/:id/update", Auth(process.env.ADMIN_TOKEN_KEY), permission("nutritional"), updateValidation.update, nutritionalController.update).
    get("/dashboard/nutritional/index", nutritionalController.getall).
    get("/dashboard/nutritional/:id/show", getValidation.get, nutritionalController.get).
    delete("/dashboard/nutritional/:id/destroy", Auth(process.env.ADMIN_TOKEN_KEY), permission("nutritional"), getValidation.get, nutritionalController.delete)
module.exports = router;