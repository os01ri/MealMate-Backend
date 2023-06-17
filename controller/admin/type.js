const fs = require("fs");
const util = require("../../util/helper");
const db = require("../../models");
const { type } = require("os");
exports.store = async (req, res, next) => {


    let name = req.body.name;
    let oldpath = req.body.url;
    let hash = await util.encodeImageToBlurhash(oldpath)
    let newpath = await util.rename(oldpath, "public/type")
    let type = await db.type.create({

        name,
        url: newpath,
        hash
    })

    return res.success(type, "the type was added successfully")


}

exports.update = async (req, res, next) => {


    let id = req.params.id;
    let name = req.query.name;
    let url = req.query.url;
    if (url == undefined) {

        await db.type.update({ name }, { where: { id } })
        let type = await db.type.findByPk(id);
        return res.success(type, "the type was updated successfully");
    }
    let deletedimage = (await db.type.findByPk(id)).url;
    fs.unlinkSync(util.getImageUrlFromHttp(deletedimage));
    let oldpath = req.query.url;
    let hash = await util.encodeImageToBlurhash(oldpath)
    url = await util.rename(oldpath, "public/type")
    await db.type.update({ name, url, hash }, { where: { id } })
    let type = await db.type.findByPk(id);
    return res.success({ type }, "the type was updated successfully")



}

exports.getall = async (req, res, next) => {

    let types = await db.type.findAll()
    return res.success(types, "this is all type")



}


exports.get = async (req, res, next) => {



    let id = req.params.id;
    let type = await db.type.findByPk(id)
    return res.success(type, "this is your type")


}

exports.delete = async (req, res, next) => {


    let id = req.params.id;
    let type = await db.type.findByPk(id);
    fs.unlinkSync(util.getImageUrlFromHttp(type.url))

    await db.type.destroy({ where: { id } })
    return res.success({}, "the type was deleted successfully")


}