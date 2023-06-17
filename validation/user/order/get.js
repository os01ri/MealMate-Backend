const { check } = require("express-validator");
const handleError = require("../../../util/helper");
const exists = require("../../../role/exist");

exports.store = [

    check("id").exists().withMessage("id is require").custom(exists("order", "id")),
    check("status").exists().withMessage("status is require").isIn([1, 2, 3]).withMessage("status value is not correct"),
    handleError.handleValidation

];