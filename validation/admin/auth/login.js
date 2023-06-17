const { check } = require("express-validator");
const handleError = require("../../../util/helper");
const exists = require("../../../role/exist");
exports.login = [
    check("username").exists().withMessage("username is require").custom(exists("admin", "username")),
    check("password").exists().withMessage("password is required"),
    handleError.handleValidation


];