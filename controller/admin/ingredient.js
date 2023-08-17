const db = require("../../models");
const util = require("../../util/helper");
const fs = require("fs");
exports.store = async (req, res, next) => {



    let name = req.body.name;
    let category_id = req.body.category_id;
    let price = req.body.price;
    let unit_id = req.body.unit_id;
    let price_by = req.body.price_by;
    let url = req.body.url;
    let hash = await util.encodeImageToBlurhash(url)

    let newpath = await util.rename(url, "public/ingredient")
    let nutritional = req.body.nutritional;
    let ingredient = await db.ingredient.create({ name, price, category_id, unit_id, price_by, url: newpath, hash });
    // return res.success({},"sdfsd")
    let pivot = nutritional.map(object => {
        let ob = {};
        ob.ingredient_id = ingredient.id;
        ob.nutritional_id = object.id;
        ob.value = object.value;
        ob.unit_id = object.unit_id;
        ob.precent = object.precent;
        return ob;
    })
    await db.ingredient_nutritional.bulkCreate(pivot)
    ingredient = await db.ingredient.findByPk(ingredient.id, { include: [{ model: db.nutritional, through: { attributes: ["value", "precent"] } }, { model: db.unit }, { model: db.category1 }] })
    return res.success(ingredient, "the ingredient was created successfully")




}



exports.update = async (req, res, next) => {

    let id = req.params.id;
    let name = req.body.name;
    let category_id = req.body.category_id;

    let price = req.body.price;
    let unit_id = req.body.unit_id;
    let price_by = req.body.price_by;
    let nutritional = req.body.nutritional;
    let url = req.body.url;
    if (url == undefined) {

        await db.ingredient.update({ name, price, unit_id, category_id, price_by }, { where: { id } })

    } else {

        let deletedimage = (await db.ingredient.findByPk(id)).url;

        fs.unlinkSync(util.getImageUrlFromHttp(deletedimage));
        let oldpath = req.body.url;
        let hash = await util.encodeImageToBlurhash(oldpath)
        url = await util.rename(oldpath, "public/ingredient")
        await db.ingredient.update({ name, category_id, price, unit_id, price_by, url, hash }, { where: { id } })


    }

    await db.ingredient_nutritional.destroy({ where: { ingredient_id: id } })

    let pivot = nutritional.map(object => {
        let ob = {};
        ob.ingredient_id = id;
        ob.nutritional_id = object.id;
        ob.value = object.value;
        ob.unit_id = object.unit_id;
        ob.precent = object.precent;
        return ob;
    })

    await db.ingredient_nutritional.bulkCreate(pivot)
    let ingredient = await db.ingredient.findByPk(id, { include: [{ model: db.nutritional, through: { attributes: ["value", "precent"] } }, { model: db.unit }, { model: db.category1 }] })

    return res.success(ingredient, "the ingredient was updated successfully")



}

exports.getall = async (req, res, next) => {

    let category_id=req.query.category_id;

    let ingredients = await db.ingredient.scope({method:["category",category_id]}).findAll({ include: [{ model: db.nutritional, through: { attributes: ["value"] } }, { model: db.unit }, { model: db.category1 }] });
    return res.success(ingredients, "this is all ingredients")

}

exports.get = async (req, res, next) => {

    let id = req.params.id;
    let ingredient = await db.ingredient.findByPk(id, { include: [{ model: db.nutritional, through: { attributes: ["value"] } }, { model: db.unit }, { model: db.category1 }] });
    return res.success(ingredient, "this is the ingredient")

}

exports.delete = async (req, res, next) => {


    let id = req.params.id;
    await db.ingredient.destroy({ where: { id } })
    return res.success({}, "the ingredient is deleted")


}