const { check } = require("express-validator");
const handleError = require("../../../util/helper");
const unique = require("../../../role/unique");
const exists = require("../../../role/exist");

exports.store = [
    check("name").exists().withMessage("name is require").custom(unique("category1", "name")),
    check("url").exists().withMessage("url is required").custom(exists("temp", "url")),
    handleError.handleValidation


];