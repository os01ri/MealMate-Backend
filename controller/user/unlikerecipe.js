const db = require("../../models");

exports.store = async (req, res, next) => {


    try {


        let user_id = req.user.id;
        let recipe_id = req.body.recipe_id;
        await db.unlikerecipe.create({
            user_id,
            recipe_id
        })

        return res.success({}, "the recipe was added to unlike successfully")


    } catch (ex) {

        return res.error(500, {}, "the recipe was added to unlike already")


    }


}



exports.getall = async (req, res, next) => {


    let unlikes = await db.unlikerecipe.findAll();

    return res.success(unlikes, "this is all unlike ingredient")

}


exports.show = async (req, res, next) => {


    let id = req.params.id;
    let unlike = await db.unlikerecipe.findByPk(id);

    return res.success(unlike, "this is all unlike ingredient")


}


exports.destroy = async (req, res, next) => {


    await db.unlikerecipe.destroy({ where: { id: req.params.id } })
    return res.success({}, "the unlike ingredient was deleted  successfully")

}