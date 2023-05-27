const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const unique=require("../../../role/unique");
const exists=require("../../../role/exist");

exports.update=[
    
    check("id").exists().withMessage("id is require").custom(exists("unit","id")),    
    check("name").exists().withMessage("name is require").custom(unique("unit","name",true)),
    check("code").exists().withMessage("code is require").custom(unique("unit","code",true)),
    handleError.handleValidation


];