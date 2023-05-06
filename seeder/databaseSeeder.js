require("dotenv").config();
const database=require("../util/databaseConnection");
let createAdmin=require("./createadmin");
database.sync({force:true}).then(async()=>{

    await createAdmin();


})
