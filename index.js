require("dotenv").config();
const express=require("express");
const app=express();
const port=process.env.PORT||5001;
const cor=require("./config/optionOrigin");
const path=require("path");
const log=require("./config/log");
const errorLog=require("./config/errorLog");
const database=require("./util/databaseConnection");




app.use(express.static(path.join(__dirname,"public")));
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
const type=require("./routes/admin//type");
const ingredient=require("./routes/admin/ingredient");
const nutritional=require("./routes/admin/nutritional");
const recipe=require("./routes/admin/recipe");
const userauth=require("./routes/user/auth");
const userpassword=require("./routes/user/password");
const wishlist=require("./routes/user/wishlist");
const grocery=require("./routes/user/grocery");



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



app.use(adminpassword)
app.use(role)
app.use(image)
app.use(error.notFound)





database.sync().then((result)=>{

    app.listen(port,()=>{

        console.log(`app is listening in port ${port}`)
        
        })

})
