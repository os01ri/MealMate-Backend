const db = require("../../models")

exports.store=async(req,res,next)=>{


    let follower_id=req.user.id;
    console.log(follower_id)
    let followby_id=req.body.user_id;
    
    let count=await db.follow.count({where:{followby_id,follower_id}});
    if(count>0){

    return res.success(null,"you are follow this person already");


    }
    await db.follow.create({followby_id,follower_id});
    return res.success(null,"you are follow this person successfully");


}


exports.unfollow=async(req,res,next)=>{

    
    let follower_id=req.user.id;
    let followby_id=req.body.user_id;
    
    await db.follow.destroy({where:{followby_id,follower_id}});
    return res.success(null,"you are follow this person successfully");


}


exports.indexfollower=async(req,res,next)=>{


    let follower_id=req.user.id;
    // let follower= await db.follow.findAll({
    //     where:{follower_id},
    //     include:["followby"],
    //     attributes:["id"]
    
    
    // })   
    let follower=await db.user.findByPk(follower_id,{

        include:[{

            association:"follower",
            through: {attributes: []}

        }]

    });
    // let follower=await db.user.findByPk(follower_id,{

    //     attributes:["id"],
    //     include:[]
    // })
    return res.success(follower.followby??null,"this is your follower")
   


}


exports.indexfollowby=async(req,res,next)=>{


    let followby_id=req.user.id;

    let follower=await db.user.findByPk(followby_id,{

        include:[{

            association:"followby",
            through: {attributes: []}

        }]

    })
    return res.success(follower.followby??null,"this is the person you are follow")
   


}