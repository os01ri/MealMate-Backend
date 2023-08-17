require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const log = require("./config/log");
const errorLog = require("./config/errorLog");
const database = require("./util/databaseConnection");
const response = require("./services/response");

const routes = require("./routes");

require("express-async-errors")



app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();



})

app.use(response.response);
app.use("/public", express.static("public"));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(log);
app.use(errorLog)




app.use(routes);
app.use((err, req, res, next) => {

    return res.status(500).json({ message: err.message })
})


 process.on('uncaughtException', function (err) {




 });

database.sync().then((result) => {

    app.listen(port, () => {

        console.log(`app is listening in port ${port}`)

    })

})
