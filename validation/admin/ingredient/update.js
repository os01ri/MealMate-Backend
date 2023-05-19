const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const unique=require("../../../role/unique");
const exist=require("../../../role/exist");
const checkArrayKeys=require("../../../role/checkArraykeys");

exports.update=[
    check("id").exists().withMessage("id is require").custom(exist("ingredient","id")),
    check("name").exists().withMessage("name is require").custom(unique("ingredient","name")),
    // check("nutritional").exists().withMessage("nutritional is require").isArray().withMessage("nutritional should be array").custom(checkArrayKeys("nutritional","id")),

    handleError.handleValidation


];