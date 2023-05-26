const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const unique=require("../../../role/unique");
const checkPermissions = require("../../../role/checkPermission");

exports.store=[
    check("name").exists().withMessage("name is require").custom(unique("type","name")),
    check("url").exists().withMessage("url is required"),
    handleError.handleValidation


];