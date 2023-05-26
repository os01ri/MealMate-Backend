const {check}=require("express-validator");
const handleError=require("../../../util/helper");
exports.checkcode=[
    check("code").exists().withMessage("code is require"),
    handleError.handleValidation


];