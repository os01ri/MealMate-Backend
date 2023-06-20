const { check } = require("express-validator");
const handleError = require("../../../util/helper");
const unique = require("../../../role/unique");
const exists = require("../../../role/exist");
const checkArrayKeys = require("../../../role/checkArraykeys");

exports.update = [

    check("id").exists().withMessage("id is require").custom(exists("ingredient", "id")),
    check("name").exists().withMessage("name is require").custom(unique("ingredient", "name", true)),
    check("price").exists().withMessage("price is require").isFloat({ min: 0 }).withMessage("price should be number gratter from 0"),
    check("price_by").exists().withMessage("price by is require").isFloat({ min: 0 }).withMessage("price by should be number gratter from 0"),
    check("unit_id").exists().withMessage("unit id is require").custom(exists("unit", "id")),
    check("category_id").exists().withMessage("category id is require").custom(exists("category1", "id")),
    check("url").isURL().withMessage("image should be url").custom(exists("temp", "url")),
    check("nutritional.*.value").exists().withMessage("value id is require").isFloat({ min: 0 }).withMessage("value should be number"),
    check("nutritional.*.precent").exists().withMessage("precent id is require").isFloat({ min: 0, max: 100 }).withMessage("precent should be number"),
    check("nutritional.*.unit_id").exists().withMessage("unit id is required").custom(exists("unit", "id")),
    check("nutritional").exists().withMessage("nutritional is require").isArray().withMessage("nutritional should be array").custom(checkArrayKeys("nutritional", "id")),
    handleError.handleValidation



];