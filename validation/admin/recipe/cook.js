const { check } = require("express-validator");
const handleError = require("../../../util/helper");
const exist = require("../../../role/exist");

exports.cook = [
    check("recipe_id").exists().withMessage("recipe id is require").custom(exist("recipe", "id")),

    handleError.handleValidation


];