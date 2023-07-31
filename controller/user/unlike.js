const db = require("../../models");

exports.store = async (req, res, next) => {


    try {


        let user_id = req.user.id;
        let ingredient_id = req.body.ingredient_id;
        let ingredient = await db.unlike.create({
            user_id,
            ingredient_id
        })


        return res.success(ingredient, "the ingrredient was added to unlike  successfully")


    } catch (ex) {


        return res.error(500, {}, "the ingrredient was added to unlike  already")



    }

}



exports.getall = async (req, res, next) => {


    let unlikes = await db.unlike.findAll({include:["ingredient"],

    attributes: { exclude: ["ingredient_id","user_id"] }
});

    return res.success(unlikes, "this is all unlike ingredient")

}


exports.show = async (req, res, next) => {


    let id = req.params.id;
    
    let unlike = await db.unlike.findByPk(id,{include:["ingredient"],

    attributes: { exclude: ["ingredient_id","user_id"] }
});

    return res.success(unlike, "this is all unlike ingredient")


}


exports.destroy = async (req, res, next) => {


    await db.unlike.destroy({ where: { id: req.params.id } })
    return res.success({}, "the unlike ingredient was deleted  successfully")



}