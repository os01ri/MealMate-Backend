const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const exists=require("../../../role/exist");
const unique=require("../../../role/unique");

exports.register=[
    check("name").exists().withMessage("naem is require").custom(unique("user","name")),
    check("email").exists().withMessage("email is require").isEmail().withMessage("email field should be email").custom(unique("user","email")),
    check("password").exists().withMessage("password is required"),

    handleError.handleValidation


];