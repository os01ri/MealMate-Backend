const jwt=require("jsonwebtoken");
const redis=require("../config/redis");
module.exports=(type)=>{

    return async(req,res,next)=>{

        let headerAuth=req.get("Authorization");
        if(!headerAuth){
    
            res.status(401).json({message:"token not found"})
        }
        
        let token=headerAuth.split(" ")[1];
        if(!token){

            res.status(401).json({message:"token format is not correct "})
        }
        try{

            let user=jwt.verify(token,type);    
            if(type!=process.env.ADMIN_REFRESH_TOKEN_KEY){

            let id=await redis.get(token);
            if(id==null){

                return res.status(401).json({message:"Expired token"})

            }

            }
            
            req.user=user
            return next()

        }catch(ex){

            return res.status(401).json({message:"Invalid token"})

        }
        
    }


}
