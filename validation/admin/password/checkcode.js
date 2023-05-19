const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const exists=require("../../../role/exist");
exports.checkcode=[
    check("code").exists().withMessage("code is require"),
    handleError.handleValidation


];