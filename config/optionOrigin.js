const list=require("./allowOrigin");
const cors=require("cors");
const Option={
    origin:(Origin,callback)=>{
        (!Origin||list.indexOf(Origin)!==-1)?callback(null,true):callback(new Error("this origin is not allowed"));      
    },
    optionsSuccessStatus:200

};

module.exports=cors(Option);