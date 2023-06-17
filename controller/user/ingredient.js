const db = require("../../models");

exports.getall = async (req, res, next) => {

    let category_id = req.query.category;
    let nutritionals = req.query.nutritionals;
    nutritionals = (nutritionals != undefined) ? JSON.parse(nutritionals) : null;
    let ingredients = await db.ingredient.scope({ method: ["category", category_id] }).findAll({ include: [{ model: db.nutritional, through: { attributes: ["value"] } }, { model: db.unit }, { model: db.category1 }] });
    return res.success(ingredients, "this is all ingredients")





}



exports.get = async (req, res, next) => {

    let id = req.params.id;
    let ingredient = await db.ingredient.findByPk(id, { include: [{ model: db.nutritional, through: { attributes: ["value"] } }, { model: db.unit }, { model: db.category1 }] });
    return res.success(ingredient, "this is the ingredient")

}
