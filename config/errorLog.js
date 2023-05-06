const expressWinston=require("express-winston");
const { transports,format } = require("winston");
const errorLog=expressWinston.errorLogger({

    transports:[

        new transports.File({

            filename:"log/error.log",

        })
    ],
    format:format.combine(format.json(),format.timestamp())

})


module.exports=errorLog;