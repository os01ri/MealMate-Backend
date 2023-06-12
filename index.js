require("dotenv").config();
const express=require("express");
const app=express();
const port=process.env.PORT||5001;
const cor=require("./config/optionOrigin");
const path=require("path");
const log=require("./config/log");
const errorLog=require("./config/errorLog");
const database=require("./util/databaseConnection");
const response=require("./services/response");

require("express-async-errors")


app.use(response.response);
app.use("/public",express.static("public"));
app.use(cor);
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(log);
app.use(errorLog)




const error=require("./middleware/error");
const adminAuth=require("./routes/admin/auth");
const adminpassword=require("./routes/admin/password");
const role=require("./routes/admin/role");
const image=require("./routes/image");
const category=require("./routes/admin/category");
const categoryingredient=require("./routes/admin/categoryingredient");

const type=require("./routes/admin//type");
const ingredient=require("./routes/admin/ingredient");
const nutritional=require("./routes/admin/nutritional");
const recipe=require("./routes/admin/recipe");
const userauth=require("./routes/user/auth");
const userpassword=require("./routes/user/password");
const wishlist=require("./routes/user/wishlist");
const grocery=require("./routes/user/grocery");
const admin=require("./routes/admin/admin");
const unit=require("./routes/admin/unit");
const usercategory=require("./routes/user/category");
const usertype=require("./routes/user/type");
const usernutritional=require("./routes/user/nutritional");
const useringredient=require("./routes/user/ingredient");
const userrecipe=require("./routes/user/recipe");
const userorder=require("./routes/user/order");


app.use(adminAuth);
app.use(category);
app.use(type);
app.use(ingredient);
app.use(nutritional);
app.use(recipe);
app.use(userauth);
app.use(userpassword);
app.use(wishlist);
app.use(grocery);
app.use(admin);
app.use(unit);
app.use(usercategory);
app.use(usertype);
app.use(usernutritional);
app.use(useringredient);
app.use(userrecipe);
app.use(userorder);
app.use(categoryingredient);





app.use(adminpassword)
app.use(role)
app.use(image)
app.use(error.notFound)


app.use((err,req,res,next)=>{

    return res.status(500).json({message:err.message})
})
database.sync().then((result)=>{

    app.listen(port,()=>{

        console.log(`app is listening in port ${port}`)
        
        })

})
