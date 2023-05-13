const Nutritional=require("../../models/nutritional");
const Ingredient=require("../../models/ingredient");
exports.store=async(req,res,next)=>{


    let name=req.body.name;
    let nutritional=await Nutritional.create({name})
    return res.status(200).json(nutritional)



}


exports.update=async(req,res,next)=>{

    let id=req.params.id;
    let name=req.body.name;
    await Nutritional.update({name},{where:{id}})
    return res.status(200).json()


}

exports.getall=async(req,res,next)=>{

    let nutritionals=await Nutritional.findAll({include:Ingredient});
    res.status(200).json(nutritionals)


}

exports.get=async(req,res,next)=>{

    let id=req.params.id;
    let nutritional=await Nutritional.findByPk(id);
    res.status(200).json(nutritional)

}


exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    await Nutritional.destroy({where:{id}})
    res.status(200).json()


}