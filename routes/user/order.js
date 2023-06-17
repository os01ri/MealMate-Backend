const express = require("express");
const orderController = require("../../controller/user/order");
const router = express.Router();

const storeValidation = require("../../validation/user/order/store");
const Auth = require("../../middleware/Auth");

router.post("/user/order/store", Auth(process.env.USER_TOKEN_KEY), storeValidation.store, orderController.store).
    post("/dashboard/order/:id/changestatus", Auth(process.env.USER_TOKEN_KEY), orderController.changestatus).
    get("/user/order/index", Auth(process.env.USER_TOKEN_KEY), orderController.getAllOrder).
    get("/dashboard/order/getallorder", Auth(process.env.ADMIN_TOKEN_KEY), orderController.getallorder)
module.exports = router;