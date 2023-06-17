const express = require("express");
const ingredientController = require("../../controller/admin/ingredient");
const router = express.Router();
const Auth = require("../../middleware/Auth");
const permission = require("../../middleware/permission");
const storeValidation = require("../../validation/admin/ingredient/store");
const updateValidation = require("../../validation/admin/ingredient/update");
const getValidation = require("../../validation/admin/ingredient/get");

router.post("/dashboard/ingredient/store", Auth(process.env.ADMIN_TOKEN_KEY), permission("ingredient"), storeValidation.store, ingredientController.store).
    put("/dashboard/ingredient/:id/update", Auth(process.env.ADMIN_TOKEN_KEY), permission("ingredient"), updateValidation.update, ingredientController.update).
    get("/dashboard/ingredient/index", ingredientController.getall).
    get("/dashboard/ingredient/:id/show", getValidation.get, ingredientController.get).
    delete("/dashboard/ingredient/:id/destroy", Auth(process.env.ADMIN_TOKEN_KEY), permission("ingredient"), getValidation.get, ingredientController.delete)
module.exports = router;