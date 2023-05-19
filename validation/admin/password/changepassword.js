const {check}=require("express-validator");
const handleError=require("../../../util/helper");
exports.changepassword=[
    check("password").exists().withMessage("password is require"),
    handleError.handleValidation


];