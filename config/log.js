const expressWinston=require("express-winston");
const { transports,format } = require("winston");
const log=expressWinston.logger({

    transports:[
        new transports.File({

            level:"info",
            filename:"log/info.log"

        })
    ],
    format: format.combine(
    
        format.json(),
        format.timestamp(),
        format.prettyPrint()
        
    ),
    statusLevels:true

});

module.exports=log;
