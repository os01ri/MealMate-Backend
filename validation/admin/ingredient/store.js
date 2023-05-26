const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const unique=require("../../../role/unique");
const checkArrayKeys=require("../../../role/checkArraykeys");

exports.store=[
    check("name").exists().withMessage("name is require").custom(unique("ingredient","name")),
    check("nutritional").exists().withMessage("nutritional is require").isArray().withMessage("nutritional should be array").custom(checkArrayKeys("nutritional","id")),
    handleError.handleValidation


];