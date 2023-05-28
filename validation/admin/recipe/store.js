const {check}=require("express-validator");
const handleError=require("../../../util/helper");
const unique=require("../../../role/unique");
const exist=require("../../../role/exist");

const checkArrayExists=require("../../../role/checkArrayExists");

exports.store=[
    check("name").exists().withMessage("name is require").custom(unique("recipe","name")),
    check("description").exists().withMessage("description is require"),
    check("time").exists().withMessage("time is require").isNumeric().withMessage("time field should be time"),
    check("url").exists().withMessage("url is require"),
    check("type_id").exists().withMessage("type id is require").custom(exist("type","id")),
    check("category_id").exists().withMessage("category id is require").custom(exist("category","id")),
    check("step").exists().isArray().withMessage("step should be array"),
    check("step.*.name").exists().withMessage("step name is require").isString().withMessage("step name should be string"),
    check("step.*.rank").exists().withMessage("step name is require").isNumeric().withMessage("step name should be number"),
    check("step.*.description").exists().withMessage("step description is require"),
    check("ingredient").exists().withMessage("ingredient should be array"),
    check("ingredient.*.id").exists().withMessage("ingredient id is require").custom(checkArrayExists("ingredient","id")),
    check("ingredient.*.quantity").exists().withMessage("ingredient id is require"),
    check("ingredient.*.unit_id").exists().withMessage("unit id is require").custom(checkArrayExists("unit","id")),

    handleError.handleValidation


];