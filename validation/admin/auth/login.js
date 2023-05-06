const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const exists=require("../../../role/exist");
exports.login=[
    check("email").exists().withMessage("email is require").isEmail().withMessage("this field should be email").custom(exists("Admin","email")),
    check("password").exists().withMessage("password is required"),
    handleError.handleValidation


];