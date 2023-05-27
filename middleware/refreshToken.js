const jwt=require("jsonwebtoken");
module.exports=(type)=>{

    return (req,res,next)=>{

        let refreshToken=req.body.refreshtoken;
        if(!refreshToken){
    
            return res.error(401,"refreshToken not found")

        }
        
        try{

            let user=jwt.verify(refreshToken,type);              
            req.user=user
            return next()

        }catch(ex){

            return res.error(401,"Invalid refreshToken")
            

        }
        
    }


}
