const { check } = require("express-validator");
const handleError = require("../../../util/helper");
const exists = require("../../../role/exist");

exports.get = [

    check("id").exists().withMessage("id is require").custom(exists("unlikerecipe", "id")),
    handleError.handleValidation

];