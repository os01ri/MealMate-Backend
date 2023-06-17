const express = require("express");
const categoryController = require("../../controller/admin/category");
const router = express.Router();

const getValidation = require("../../validation/admin/category/get");

router.get("/user/category/index", categoryController.getall).
    get("/user/category/:id/show", getValidation.get, categoryController.get)
module.exports = router;