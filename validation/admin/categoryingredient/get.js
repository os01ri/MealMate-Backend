const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const exist=require("../../../role/exist");


exports.get=[
    check("id").exists().withMessage("id is require").custom(exist("category1","id")),
    handleError.handleValidation


];