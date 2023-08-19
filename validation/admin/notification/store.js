const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const unique=require("../../../role/unique");

exports.store=[
    check("title").exists().withMessage("title is require"),
    check("body").exists().withMessage("body is require"),

    handleError.handleValidation


];