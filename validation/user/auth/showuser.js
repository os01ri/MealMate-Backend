const { check } = require("express-validator");
const handleError = require("../../../util/helper");
const exists = require("../../../role/exist");

exports.showuser = [
    check("id").exists().withMessage("id is require").custom(exists("user", "id")),
    handleError.handleValidation


];