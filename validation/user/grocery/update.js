const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const exists=require("../../../role/exist");

exports.update=[
    check("id").exists().withMessage(" id is require").custom(exists("grocery","id")),
    check("ingredient_id").exists().withMessage("ingredient id is require").custom(exists("ingredient","id")),
    check("unit_id").exists().withMessage("unit id is require").custom(exists("unit","id")),
    check("quantity").exists().withMessage("quantity  is require"),
    handleError.handleValidation

];