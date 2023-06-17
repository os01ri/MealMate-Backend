const { check } = require("express-validator");
const handleError = require("../../../util/helper");
const exists = require("../../../role/exist");
const unique = require("../../../role/unique");

exports.store = [

    check("name").exists().withMessage("name is required").custom(unique("admin", "name")),
    check("username").exists().withMessage("username is required").custom(unique("admin", "username")),

    check("email").exists().withMessage("email is require").isEmail().withMessage("this field should be email").custom(unique("admin", "email")),
    check("password").exists().withMessage("password is required"),
    check("username").exists().withMessage("username is required").custom(unique("admin", "username")),
    check("role_id").exists().withMessage("role id is required").custom(exists("role", "id")),
    check("logo").custom(exists("temp", "url")),

    handleError.handleValidation


];