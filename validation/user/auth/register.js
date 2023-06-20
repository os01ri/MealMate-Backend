const { check } = require("express-validator");
const handleError = require("../../../util/helper");
const exists = require("../../../role/exist");
const unique = require("../../../role/unique");

exports.register = [
    check("name").exists().withMessage("naem is require"),
    check("username").exists().withMessage("username is require").custom(unique("user", "username")),
    check("email").exists().withMessage("email is require").isEmail().withMessage("email field should be email").custom(unique("user", "email")),
    check("password").exists().withMessage("password is required"),
    check("logo").isURL().withMessage("image should be url").custom(exists("temp", "url")),
    handleError.handleValidation


];