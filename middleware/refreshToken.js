const jwt=require("jsonwebtoken");
module.exports=(type)=>{

    return (req,res,next)=>{

        let refreshToken=req.body.refreshtoken;
        if(!refreshToken){
    
            res.status(401).json({message:"refreshToken not found"})
        }
        
        try{

            let user=jwt.verify(refreshToken,type);              
            req.user=user
            return next()

        }catch(ex){

            res.status(401).json({message:"Invalid refreshToken"})

        }
        
    }


}
