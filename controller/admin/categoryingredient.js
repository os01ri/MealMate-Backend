const fs = require("fs");
const path = require("path");
const util = require("../../util/helper");
const db = require("../../models");
exports.store = async (req, res, next) => {


    let name = req.body.name;
    let oldpath = req.body.url;
    let hash = await util.encodeImageToBlurhash(oldpath)
    let newpath = await util.rename(oldpath, "public/categoryingredient")
    let category = await db.category1.create({
        name,
        url: newpath,
        hash
    })

    return res.success(category, "the category ingredient was created successfully")

}



exports.update = async (req, res, next) => {


    let id = req.params.id;
    let name = req.query.name;
    let url = req.query.url;
    if (url == undefined) {

        await db.category1.update({ name }, { where: { id } })
        let category = await db.category1.findByPk(id, { include: [db.ingredient] });
        return res.success(category, "the category was updated successflly")
    }
    let deletedimage = (await db.category1.findByPk(id)).url;
    fs.unlinkSync(util.getImageUrlFromHttp(deletedimage));
    let oldpath = req.query.url;
    let hash = await util.encodeImageToBlurhash(oldpath)
    url = await util.rename(oldpath, "public/categoryingredient")
    await db.category1.update({ name, url }, { where: { id } })
    let category = await db.category1.findByPk(id, { include: [db.ingredient] });
    return res.success({ category }, "the category was updated successfully")

}
exports.getall = async (req, res) => {



    let categories = await db.category1.findAll({ include: [db.ingredient] })
    let count = await db.category1.count()

    return res.success({ categories, count }, "this is all categories")



}

exports.get = async (req, res, next) => {


    let id = req.params.id;
    let category = await db.category1.findByPk(id, { include: [db.ingredient] })

    return res.success(category, "this is the category")




}



exports.delete = async (req, res, next) => {


    let id = req.params.id;
    let category = await db.category1.findByPk(id);
    await db.category1.destroy({ where: { id } })
    fs.unlinkSync(util.getImageUrlFromHttp(category.url))
    return res.success({}, "the category was deleted successfully")


}