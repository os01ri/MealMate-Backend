const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const unique=require("../../../role/unique");
const exist=require("../../../role/exist");

exports.update=[
    check("id").exists().withMessage("id is require").custom(exist("type","id")),
    check("name").exists().withMessage("name is require").custom(unique("type","name")),
    check("url").custom(exist("temp","url")),

    handleError.handleValidation


];