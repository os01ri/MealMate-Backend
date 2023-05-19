const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const exists=require("../../../role/exist");

exports.store=[

    check("ingredient_id").exists().withMessage("ingredient id is require").custom(exists("ingredient","id")),
    check("quantity").exists().withMessage("quantity  is require"),
    handleError.handleValidation

];