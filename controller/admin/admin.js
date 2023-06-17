const { includes } = require("../../config/permission");
const db = require("../../models");
const util = require("../../util/helper");
const fs = require("fs");
exports.store = async (req, res, next) => {

    let name = req.body.name;
    let username = req.body.username;

    let email = req.body.email;
    let password = req.body.password;
    let logo = req.body.logo;
    let hash = null;
    let role_id = req.body.role_id;

    if (logo) {

        hash = await util.encodeImageToBlurhash(logo)
        logo = await util.rename(logo, "public/admin")

    }

    let admin = await db.admin.create({ name, email, password, logo, hash, role_id, username });
    admin = await db.admin.findByPk(admin.id, { include: db.role });
    return res.success(admin, "the admin was created successfully")



}


exports.getAllAdmin = async (req, res, next) => {


    let admins = await db.admin.findAll({ include: db.role }, { where: { is_superAdmin: false } })

    return res.success(admins, "this is all admins")
}

exports.get = async (req, res, next) => {


    let id = req.params.id;
    let admin = await db.admin.findByPk(id, { include: db.role });
    return res.success(admin, "this is the admin")

}


exports.delete = async (req, res, next) => {


    let id = req.params.id;

    let admin = await db.admin.findByPk(id);
    await db.admin.destroy({ where: { id } })
    if (admin.logo) {

        fs.unlinkSync(util.getImageUrlFromHttp(admin.logo))

    }

    return res.success({}, "the admin was deleted successfully")
}