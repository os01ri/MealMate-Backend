const db = require("../../models");
const permissions = require("../../config/permission");
exports.store = async (req, res, next) => {


    let name = req.body.name;
    let permission = req.body.permission;
    let role = await db.role.create({
        name,
        permission
    })


    return res.success(role, "the role was added successfully")
}

exports.update = async (req, res, next) => {


    let id = req.params.id;
    let name = req.query.name;
    let permission = req.query.permission;
    await db.role.update({ name, permission }, { where: { id } })
    let role = await db.role.findByPk(id);
    return res.success(role, "the role was updated successfully")



}

exports.getall = async (req, res, next) => {


    let roles = await db.role.findAll({ include: { model: db.admin, attributes: { exclude: ["password", "role_id", "code"] } } })
    return res.success(roles, "this is all role")

}

exports.get = async (req, res, next) => {


    let id = req.params.id;

    let role = await db.role.findByPk(id, { include: { model: db.admin, attributes: { exclude: ["password", "role_id", "code"] } } })

    return res.success(role, "this is the role")


}


exports.delete = async (req, res, next) => {


    let id = req.params.id;
    await db.role.destroy({ where: { id } })
    return res.success({}, "the role was deleted successfully")
}


exports.getAllPermission = (req, res, next) => {


    return res.success(permissions, "this is all permission")

}