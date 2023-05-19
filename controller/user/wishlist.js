const db = require("../../models")

exports.addtowishlist=async(req,res,next)=>{


    await db.wishlist.create({

        user_id:req.user.id,
        ingredient_id:req.body.ingredient_id
    })

    return res.status(200).json()





}


exports.getall=async(req,res,next)=>{


    let wishlist=await db.wishlist.findAll({where:{user_id:req.user.id},include:db.ingredient});

    return res.status(200).json(wishlist)
}


exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    await db.wishlist.destroy({where:{id}})
    return res.status(200).json()
}