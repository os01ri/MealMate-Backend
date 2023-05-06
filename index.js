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


app.use(adminAuth);
app.use(category);
app.use(type);

app.use(adminpassword)
app.use(role)
app.use(image)
app.use(error.notFound)





database.sync().then((result)=>{

    app.listen(port,()=>{

        console.log(`app is listening in port ${port}`)
        
        })

})
