const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const unique=require("../../../role/unique");
const exist=require("../../../role/exist");

exports.update=[
    check("id").exists().withMessage("id is require").custom(exist("nutritional","id")),
    check("name").exists().withMessage("name is require").custom(unique("nutritional","name",true)),
    handleError.handleValidation


];