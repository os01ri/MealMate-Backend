const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const unique=require("../../../role/unique");
const checkPermissions = require("../../../role/checkPermission");

exports.store=[
    check("name").exists().withMessage("name is require").custom(unique("admin","name")),
    check("permission").isArray().withMessage("permission shuold be array").custom(checkPermissions),
    handleError.handleValidation


];