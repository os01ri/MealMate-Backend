const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const exists=require("../../../role/exist");

exports.addtowishlist=[
    check("ingredient_id").exists().withMessage("ingredient id is require").custom(exists("ingredient","id")),
    handleError.handleValidation

];