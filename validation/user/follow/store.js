const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const exists=require("../../../role/exist");

exports.store=[

    check("user_id").exists().withMessage("user id is require").custom(exists("user","id")),
    handleError.handleValidation

];