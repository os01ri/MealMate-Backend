const db = require("../../models");

exports.getall = async (req, res, next) => {

    let category_id = req.query.category;
    let name = req.query.name;
    let nutritionals = req.query.nutritionals;
    let unlikeIngredients = await db.unlike.findAll({ where: { user_id: req.user.id } });
    unlikeIngredients = unlikeIngredients.map(unlikeIngredient => unlikeIngredient.ingredient_id)
    nutritionals = (nutritionals != undefined) ? JSON.parse(nutritionals) : null;
    console.log(unlikeIngredients)
    let ingredients = await db.ingredient.scope({ method: ["category", category_id] }, { method: ["name", name] }, { method: ["unlikeuser", unlikeIngredients] }).findAll({ include: [{ model: db.nutritional, through: { attributes: ["value"] } }, { model: db.unit }, { model: db.category1 }] });
    return res.success(ingredients, "this is all ingredients")





}



exports.get = async (req, res, next) => {

    let id = req.params.id;
    let ingredient = await db.ingredient.findByPk(id, { include: [{ model: db.nutritional, through: { attributes: ["value"] } }, { model: db.unit }, { model: db.category1 }] });
    return res.success(ingredient, "this is the ingredient")

}
