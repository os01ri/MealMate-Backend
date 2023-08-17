const { check } = require("express-validator");
const handleError = require("../../../util/helper");
const exists = require("../../../role/exist");

exports.updateprofile = [
    check("username").exists().withMessage("username is require"),
    check("name").exists().withMessage("name is required"),
    check("city").exists().withMessage("city is required"),

    check("logo").custom(exists("temp","url")),

    handleError.handleValidation


];