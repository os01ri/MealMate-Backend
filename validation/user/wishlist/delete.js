const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const exists=require("../../../role/exist");

exports.delete=[
    check("id").exists().withMessage("wishlist id is require").custom(exists("wishlist","id")),
    handleError.handleValidation

];