const express = require("express");
const ingredientController = require("../../controller/user/ingredient");
const router = express.Router();

const getValidation = require("../../validation/admin/ingredient/get");
const getallValidation = require("../../validation/user/ingredient/getall");

router.get("/user/ingredient/index", getallValidation.getall, ingredientController.getall).
    get("/user/ingredient/:id/show", getValidation.get, ingredientController.get)
module.exports = router;