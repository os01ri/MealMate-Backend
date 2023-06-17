const express = require("express");
const unitController = require("../../controller/admin/unit");
const router = express.Router();
const getValidation = require('../../validation/admin/unit/get');

router.get("/user/unit/index", unitController.getall).
    get("/user/unit/:id/show", getValidation.get, unitController.get)
module.exports = router;