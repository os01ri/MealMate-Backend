const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const unique=require("../../../role/unique");

exports.store=[
    
    check("name").exists().withMessage("name is require").custom(unique("unit","name")),
    check("code").exists().withMessage("code is require").custom(unique("unit","code")),
    handleError.handleValidation


];