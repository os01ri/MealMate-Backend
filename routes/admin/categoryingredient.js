const express = require("express");
const categoryingredientController = require("../../controller/admin/categoryingredient");
const router = express.Router();
const Auth = require("../../middleware/Auth");
const permission = require("../../middleware/permission");
const storeValidation = require("../../validation/admin/categoryingredient/store");
const updateValidation = require("../../validation/admin/categoryingredient/update");
const getValidation = require("../../validation/admin/categoryingredient/get");


router.post("/dashboard/categoryingredient/store", Auth(process.env.ADMIN_TOKEN_KEY), permission("categoryingredient"), storeValidation.store, categoryingredientController.store).
    put("/dashboard/categoryingredient/:id/update", Auth(process.env.ADMIN_TOKEN_KEY), permission("categoryingredient"), updateValidation.update, categoryingredientController.update).
    get("/dashboard/categoryingredient/index", categoryingredientController.getall).
    get("/user/categoryingredient/index", categoryingredientController.getall).
    get("/dashboard/categoryingredient/:id/show", getValidation.get, categoryingredientController.get).
    get("/user/categoryingredient/:id/show", getValidation.get, categoryingredientController.get).
    delete("/dashboard/categoryingredient/:id/destroy", Auth(process.env.ADMIN_TOKEN_KEY), permission("categoryingredient"), getValidation.get, categoryingredientController.delete)
module.exports = router;