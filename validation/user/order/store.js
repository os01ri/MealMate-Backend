const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const exists=require("../../../role/exist");

exports.store=[

    check("ingredients.*.quantity").exists().withMessage("quantity is require").isFloat({min:0}).withMessage("quantity should be number and greter from zero"),
    check("ingredients.*.unit_id").exists().withMessage("unit id is require").custom(exists("unit","id")),    
    check("ingredients.*.ingredient_id").exists().withMessage("ingredient id is require").custom(exists("ingredient","id")),    
    
    handleError.handleValidation

];