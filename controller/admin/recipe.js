const { Op } = require("sequelize");
const db = require("../../models");
const util = require("../../util/helper");
const fs = require("fs")
exports.store = async (req, res, next) => {

    let name = req.body.name;
    let description = req.body.description;
    let time = req.body.time;
    let feeds = req.body.feeds;
    // return res.success(feeds)
    let oldpath = req.body.url;
    let hash = await util.encodeImageToBlurhash(oldpath)

    let url = await util.rename(oldpath, "public/recipe")
    let type_id = req.body.type_id;
    let category_id = req.body.category_id;
    let steps = req.body.step;
    let recipe = await db.recipe.create({ name,feeds, description, time, url, type_id, category_id, steps, hash, status: true });
    steps = steps.map(ob => ({ name: ob.name, rank: ob.rank, recipe_id: recipe.id, description: ob.description }))
    await db.step.bulkCreate(steps);
    let ingredient = req.body.ingredient;
    let recipe_ingredient = ingredient.map(object => ({ ingredient_id: object.id, recipe_id: recipe.id, quantity: object.quantity, unit_id: object.unit_id }))
    await db.recipe_ingredient.bulkCreate(recipe_ingredient)
    recipe = await db.recipe.findByPk(recipe.id, { include: [db.type, db.category, db.ingredient, db.step], attributes: { exclude: ["type_id", "category_id"] } })
    res.status(200).json(recipe)

}

exports.getall = async (req, res, next) => {

    let recipes = await db.recipe.findAll({ include: [db.type, db.category, db.ingredient, db.step], attributes: { exclude: ["type_id", "category_id"] } })
    return res.success(recipes, "thiss is all recipes")

}

exports.storerate=async(req,res,next)=>{

    let id=req.body.id;
    let rate=req.body.rate;
    let recipe=await db.recipe.findByPk(id);
    let avg=recipe.rate_avg*recipe.rate_count;
    avg+=rate;
    avg=avg/(recipe.rate_count+1);
    let count=recipe.rate_count+1;
    await db.recipe.update({rate_avg:avg,rate_cosunt:count},{where:{id}});
    return res.success({},"the recipe was rating successfully");

}

exports.get = async (req, res, next) => {

    let id = req.params.id;
    let recipes = await db.recipe.findByPk(id, { include: [db.type, db.category,{model:db.ingredient,include:[db.unit ],through: { attributes: ["quantity"] }}, db.step], attributes: { exclude: ["type_id", "category_id"] } })
    let recipes1=await db.recipe.findByPk(id, { include: [{model:db.ingredient,include:[db.unit,{ model: db.nutritional, through: { attributes: ["value"] } }],through: { attributes: ["quantity"] }}], attributes: { exclude: ["type_id", "category_id"] } })

    let ingredients=recipes1.ingredients;
    let arr=[];
    let sum=0;
    for(let i=0;i<ingredients.length;i++){


        sum+=(ingredients[i].price*ingredients[i].recipe_ingredient.quantity)/(ingredients[i].price_by);

        for(let j=0;j<ingredients[i].nutritionals.length;j++){

            
            let index=arr.findIndex((value)=>value.id==ingredients[i].nutritionals[j].id);
            if(index==-1){

                arr.push(ingredients[i].nutritionals[j]);


            }else{


            let newvavlue=arr[index].ingredient_nutritionals.value+ingredients[i].nutritionals[j].ingredient_nutritionals.value;
            let object={
                id:arr[index].id,
                name:arr[index].name,
                ingredient_nutritionals:{

                    value:newvavlue
                }
            }
            arr[index]=object;

            }

            
        }


    }

    return res.success({recipes,nutritionals:arr,sum}, "this is the recipe")

}


exports.delete = async (req, res, next) => {


    let id = req.params.id;
    let recipe = await db.recipe.findByPk(id);
    await db.recipe.destroy({ where: { id } })
    fs.unlinkSync(util.getImageUrlFromHttp(recipe.url))
    return res.success({}, "the recipe was deleted successfully")



}


exports.getunactive = async (req, res, next) => {


    let recipes = await db.recipe.findAll({ include: [db.type, db.category, db.ingredient, db.step], where: { status: false }, attributes: { exclude: ["type_id", "category_id"] } })
    return res.success(recipes, "this is all unactive recipes")


}

exports.accept = async (req, res, next) => {


    let id = req.params.id;
    await db.recipe.update({ status: true }, { where: { id } })
    return res.success({}, "the recipe was accepted successfully")



}


exports.storeByUser = async (req, res, next) => {

    let name = req.body.name;
    let user_id = req.user.id;
    let feeds = req.body.feeds;

    let description = req.body.description;
    let time = req.body.time;
    let oldpath = req.body.url;
    let hash = await util.encodeImageToBlurhash(oldpath)
    let url = await util.rename(oldpath, "public/recipe")
    let type_id = req.body.type_id;
    let category_id = req.body.category_id;
    let steps = req.body.step;
    let recipe = await db.recipe.create({ name,feeds, description, hash, time, url, type_id, user_id, category_id, steps, status: false });
    steps = steps.map(ob => ({ name: ob.name, rank: ob.rank, recipe_id: recipe.id, description: ob.description }));
    await db.step.bulkCreate(steps);
    let ingredient = req.body.ingredient;
    let recipe_ingredient = ingredient.map(object => ({ ingredient_id: object.id, recipe_id: recipe.id, quantity: object.quantity, unit_id: object.unit_id }))
    await db.recipe_ingredient.bulkCreate(recipe_ingredient)
    recipe = await db.recipe.findByPk(recipe.id, { include: [db.type, db.category, db.ingredient, db.step] })
    res.status(200).json(recipe)

}

exports.indextrending = async (req, res, next) => {

    let recipes = await db.recipe.findAll({ 
        include: [db.type, db.category, {model:db.ingredient,include:db.unit,through: { attributes: ["quantity"] }}, db.step],
        where: { status: true },
        order:[["rate_avg","DESC"]]
     })
    return res.success(recipes, "this is all recipes")


}


exports.indexmostordered = async (req, res, next) => {

    let recipes = await db.recipe.findAll({ 
        include: [db.type, db.category, {model:db.ingredient,include:db.unit,through: { attributes: ["quantity"] }}, db.step],
        where: { status: true },
        order:[["ordered_count","DESC"]]
     })
    return res.success(recipes, "this is all recipes")


}


exports.getalluser = async (req, res, next) => {

    let recipes = await db.recipe.findAll({ include: [db.type, db.category, {model:db.ingredient,include:db.unit,through: { attributes: ["quantity"] }}, db.step], where: { status: true } })
    return res.success(recipes, "this is all recipes")


}

exports.getUserRecipe = async (req, res, next) => {


    let user_id = req.user.id;
    let recipes = await db.recipe.findAll({ where: { user_id }, include: [db.type, db.category, db.step, {model:db.ingredient}] });

    return res.success(recipes, "this is all recipe for you")

}


exports.getAllwithUserRecipe = async (req, res, next) => {


    let user_id = req.user.id;

    let recipes = await db.recipe.findAll({
        include: [db.type, db.category, db.step, db.ingredient],

        where: {

            [db.Sequelize.Op.or]: {

                user_id,
                status: true

            }

        }

    });

    return res.success(recipes, "this is all recipes")


}



exports.indexbyfollow=async(req,res,next)=>{


    let ids=await db.follow.findAll({where:{

        followby_id:req.user.id

    },
    attributes:["follower_id"],
    raw:true
    }).then(folows=>folows.map(follow=>follow.follower_id));


    let recipes = await db.recipe.findAll({ 
        include: [db.type, db.category, {model:db.ingredient,include:db.unit,through: { attributes: ["quantity"] }}, db.step],
        where: {
             user_id:ids
         }
     })
    return res.success(recipes, "this is all recipes")



    
}


exports.indexrestriction=async(req,res,next)=>{

    let user_id=req.user.id;
    let ingredient_ids=await db.unlike.findAll({where:{user_id}}).then(ingredients=>ingredients.map(ingredient=>ingredient.ingredient_id))
    let recipes=await db.recipe.findAll(
        {
            // where:{status:false},
        include: [db.type, db.category, {model:db.ingredient,include:db.unit,where:{

            id: {


                [Op.ne]: ingredient_ids
  
              },


        },through: { attributes: ["quantity"] }}, db.step],
    
    });
    return res.success(recipes,"this is all recipe with restriction")

}