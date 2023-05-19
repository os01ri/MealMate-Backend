const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const unique=require("../../../role/unique");
const exist=require("../../../role/exist");

exports.get=[
    check("id").exists().withMessage("id is require").custom(exist("ingredient","id")),
    handleError.handleValidation


];