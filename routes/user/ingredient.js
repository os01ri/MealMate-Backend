const express = require("express");
const ingredientController = require("../../controller/user/ingredient");
const router = express.Router();

const Auth = require("../../middleware/Auth");

const getValidation = require("../../validation/admin/ingredient/get");
const getallValidation = require("../../validation/user/ingredient/getall");

router.get("/user/ingredient/index", Auth(process.env.USER_TOKEN_KEY), getallValidation.getall, ingredientController.getall).
    get("/user/ingredient/:id/show", getValidation.get, ingredientController.get)
module.exports = router;