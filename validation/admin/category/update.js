const { check } = require("express-validator");
const handleError = require("../../../util/helper");
const unique = require("../../../role/unique");
const exist = require("../../../role/exist");


exports.update = [
    check("id").exists().withMessage("id is require").custom(exist("category", "id")),
    check("name").exists().withMessage("name is require").custom(unique("category", "name")),
    check("url").isURL().withMessage("image should be url").custom(exist("temp", "url")),

    handleError.handleValidation


];