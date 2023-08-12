
const route = require('express').Router();
const adminRoute = require("./admin/admin");
const adminauthRoute = require("./admin/auth");
const catecoryRoute = require("./admin/category");
const catecoryIngredientRoute = require("./admin/categoryingredient");
const ingredientRoute = require("./admin/ingredient");
const nutritionalRoute = require("./admin/nutritional");
const passwordRoute = require("./admin/password");
const recipeRoute = require("./admin/recipe");
const roleRoute = require("./admin/role");
const typeRoute = require("./admin/type");
const unitRoute = require("./admin/unit");

const userauthRoute = require("./user/auth");
const usercategoryRoute = require("./user/category");
const usergroceryRoute = require("./user/grocery");
const likerecipeRoute = require("./user/likerecipe");

const useringredientRoute = require("./user/ingredient");
const usernutritionalRoute = require("./user/nutritional");
const userorderRoute = require("./user/order");

const userpasswordRoute = require("./user/password");
const userrecipeRoute = require("./user/recipe");
const usertypeRoute = require("./user/type");
const userwishlistRoute = require("./user/wishlist");

const userfollow=require("./user/follow");
const userunitRoute = require("./user/unit");
const userunlikerecipeRoute = require("./user/unlikereipe");



const unlikeingredientRoute = require("./user/unlike");



const error = require("../middleware/error");
const imageroute = require("./image");



route.use(adminRoute);
route.use(unlikeingredientRoute);
route.use(userunitRoute);
route.use(userfollow);


route.use(userunlikerecipeRoute);



route.use(adminauthRoute);
route.use(catecoryRoute);
route.use(catecoryIngredientRoute);
route.use(ingredientRoute);
route.use(nutritionalRoute);
route.use(passwordRoute);
route.use(recipeRoute);
route.use(roleRoute);
route.use(typeRoute);
route.use(unitRoute);



route.use(userauthRoute);
route.use(usercategoryRoute);
route.use(usergroceryRoute);
route.use(useringredientRoute);
route.use(usernutritionalRoute);
route.use(userorderRoute);
route.use(likerecipeRoute);


route.use(userpasswordRoute);
route.use(userrecipeRoute);
route.use(usertypeRoute);
route.use(userwishlistRoute);


route.use(imageroute);

route.use(error.notFound)


module.exports = route;










