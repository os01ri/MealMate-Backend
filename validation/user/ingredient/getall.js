const { check } = require("express-validator");
const handleError = require("../../../util/helper");
const exists = require("../../../role/exist");
const checkarraystring = require("../../../role/checkarraystring");

exports.getall = [
    check("category").custom(exists("category1", "id")),
    check("nutritionals").custom(checkarraystring("nutritional")),
    handleError.handleValidation

];