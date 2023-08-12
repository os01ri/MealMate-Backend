const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const exists=require("../../../role/exist");

exports.delete=[
    check("id").exists().withMessage("likerecipe id is require").custom(exists("likerecipe","id")),
    handleError.handleValidation

];