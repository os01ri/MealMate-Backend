const db = require("../../models")

exports.store=async(req,res,next)=>{


    let follower_id=req.user.id;
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