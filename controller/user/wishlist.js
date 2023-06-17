const db = require("../../models")

exports.addtowishlist = async (req, res, next) => {


    try {

        await db.wishlist.create({

            user_id: req.user.id,
            ingredient_id: req.body.ingredient_id
        })

        return res.success({}, "the ingrredient was added to wishlist successfully")


    } catch (ex) {

        return res.error(500, {}, "the ingrredient is in wishlist already")


    }






}


exports.getall = async (req, res, next) => {


    let wishlist = await db.wishlist.findAll({ where: { user_id: req.user.id }, include: db.ingredient });

    return res.success(wishlist, "this is all wishlist")
}


exports.delete = async (req, res, next) => {


    let id = req.params.id;
    await db.wishlist.destroy({ where: { id } })
    return res.success({}, "the wishlist was deleted successfully")
}