const { check } = require("express-validator");
const handleError = require("../../../util/helper");
const exists = require("../../../role/exist");

exports.store = [
    check("recipe_id").exists().withMessage("recipe id is require").custom(exists("recipe", "id")),

    handleError.handleValidation

];