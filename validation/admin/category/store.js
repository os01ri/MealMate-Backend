const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const unique=require("../../../role/unique");

exports.store=[
    check("name").exists().withMessage("name is require").custom(unique("category","name")),
    check("url").exists().withMessage("url is required"),
    handleError.handleValidation


];