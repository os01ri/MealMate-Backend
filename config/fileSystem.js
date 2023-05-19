const multer=require("multer");
const path=require("path");
const storage=multer.memoryStorage();
module.exports=multer({
storage,
fileFilter:(req,file,callback)=>{

    let extension=path.extname(file.originalname);
    if(!(extension==".png"||extension==".jpg"||extension==".jpeg"))
    callback(new Error("error"),false);
    callback(null,true);

}
});