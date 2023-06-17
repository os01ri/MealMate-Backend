const fs = require("fs");
const path = require("path");
const util = require("../../util/helper");
const db = require("../../models");
const category = require("../../models/category");
exports.store = async (req, res, next) => {


    let name = req.body.name;
    let oldpath = req.body.url;
    let hash = await util.encodeImageToBlurhash(oldpath)
    let newpath = await util.rename(oldpath, "public/category");


    let category = await db.category.create({
        name,
        url: newpath,
        hash
    });

    return res.success(category, "the category was created successfully")

}

exports.update = async (req, res, next) => {


    let id = req.params.id;
    let name = req.query.name;
    let url = req.query.url;
    if (url == undefined) {

        await db.category.update({ name }, { where: { id } })
        let category = await db.category.findByPk(id);
        return res.success(category, "the category was updated successflly")
    }
    let deletedimage = (await db.category.findByPk(id)).url;
    fs.unlinkSync(util.getImageUrlFromHttp(deletedimage));
    let oldpath = req.query.url;
    let hash = await util.encodeImageToBlurhash(oldpath)
    url = await util.rename(oldpath, "public/category")
    await db.category.update({ name, url, hash }, { where: { id } })
    let category = await db.category.findByPk(id);
    return res.success({ category }, "the category was updated successfully")

}

exports.getall = async (req, res, next) => {


    let categories = await db.category.findAll()




    return res.success(categories, "this is all categories")

}

exports.get = async (req, res, next) => {


    let id = req.params.id;
    let category = await db.category.findByPk(id)

    return res.success(category, "this is the category")




}


exports.delete = async (req, res, next) => {


    let id = req.params.id;
    let category = await db.category.findByPk(id);
    await db.category.destroy({ where: { id } })
    fs.unlinkSync(util.getImageUrlFromHttp(category.url))
    return res.success({}, "the category was deleted successfully")


}