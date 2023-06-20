const { check } = require("express-validator");
const handleError = require("../../../util/helper");
const unique = require("../../../role/unique");
const exists = require("../../../role/exist");

const checkPermissions = require("../../../role/checkPermission");

exports.store = [
    check("name").exists().withMessage("name is require").custom(unique("type", "name")),
    check("url").exists().isURL().withMessage("image should be url").withMessage("url is required").custom(exists("temp", "url")),
    handleError.handleValidation


];