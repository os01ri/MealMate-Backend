const { sendMail } = require("../../config/mail");
const db = require("../../models");
const util = require("../../util/helper");
const mail = require("../../config/mail");
const { Op } = require("sequelize");

exports.register = async (req, res, next) => {


    let name = req.body.name;
    let username = req.body.username;
    let city=req.body.city;
    let email = req.body.email;
    let password = req.body.password;
    let logo = req.body.logo;
    let hash = req.body.logo;
    let code = util.randomcode();
    if (logo != undefined) {

        hash = await util.encodeImageToBlurhash(logo)
        logo = await util.rename(logo, "public/user")
    }

    let user = await db.user.create({ name, email, password, logo,city, code, username, hash })


    // mail.sendMail({

    //     from: process.env.MAIL_FROM,
    //     to: email,
    //     subject: "Verify Code",
    //     text: `You Can Verify Your Account by this code ${code}`
    // })

    let token = await util.generateToken(user.id, process.env.USER_TOKEN_KEY, process.env.USER_TOKEN_EXPIRED_AT);
    let refreshToken = await util.generateToken(user.id, process.env.USER_REFRESH_TOKEN_KEY, process.env.USER_REFRSH_TOKEN_EXPIRED_AT);
    let expired_at = Number.parseInt(process.env.USER_TOKEN_EXPIRED_AT);
    let token_info = {
        token,
        refreshToken,
        expired_at

    };

    user = await db.user.findByPk(user.id);
    user = user.toJSON();

    user.token_info = token_info;
    return res.success(user, "the user was created successfully")





}


exports.verify = async (req, res, next) => {

    let id = req.user.id;
    let code = req.body.code;
    let user = await db.user.findOne({ where: { id, code } });
    if (!user) {

        return res.error(405, "your code is not correct")
    }
    await db.user.update({ status: true, code: null }, { where: { id: user.id } })
    return res.success({}, "the account was verified successfully")

}



exports.login = async (req, res, next) => {


    let username = req.body.username;
    let password = req.body.password;
    let user = await db.user.findOne({
        where: {
            username
        },

    });

    if (user.comparePassword(password)) {

        user = user.toJSON();

        let token = await util.generateToken(user.id, process.env.USER_TOKEN_KEY, process.env.USER_TOKEN_EXPIRED_AT);
        let refreshToken = await util.generateToken(user.id, process.env.USER_REFRESH_TOKEN_KEY, process.env.USER_REFRSH_TOKEN_EXPIRED_AT);
        let expired_at = Number.parseInt(process.env.USER_TOKEN_EXPIRED_AT);
        let token_info = {
            token,
            refreshToken,
            expired_at
        };
        user.token_info = token_info;

        return res.success(user, "this is user account")

    }

    return res.error(405, "the email or password is not correct")
}


exports.refreshtoken = async (req, res, next) => {


    let token = await util.generateToken(req.user.id, process.env.USER_TOKEN_KEY, process.env.USER_TOKEN_EXPIRED_AT);
    let refreshToken = await util.generateToken(req.user.id, process.env.USER_REFRESH_TOKEN_KEY, process.env.USER_REFRSH_TOKEN_EXPIRED_AT);
    let expired_at = Number.parseInt(process.env.USER_TOKEN_EXPIRED_AT);
    return res.success({ refreshToken, token, expired_at }, "this is tokens info")





}


exports.logout = (req, res, next) => {


    util.logout(req)
        .then(() => res.status(200).json({ message: "you are logout successfully" }))
        .catch(() => res.status(500).json({ message: "we have error" }))



}



exports.showuserinfo=async(req,res,next)=>{

    let user=await db.user.findByPk(req.user.id,{

        // includeIgnoreAttributes:false,

        attributes:[

            "id",
            "name",
            "username",
            "email",
            "city",
            "logo",
            "hash",
            "status",

                // [db.Sequelize.fn('COUNT', db.Sequelize.col('follower.id')), 'followers'],
                // [db.Sequelize.fn('COUNT', db.Sequelize.col('followby.id')), 'following'],



        ],

        
        // include:[

        //     {association:"unlikeingredient",through: { attributes: []}},
        //     {association:"follower",

        //     attributes:[

        //     ]
            
        // },
        //     {association:"followby",
        
        //     attributes:[

        //     ]}
    
        // ],


    });

    res.success(user,"this is your info")
}


exports.updateprofile=async(req,res,next)=>{


    let id=req.user.id;
    let username=req.body.username;
    let name=req.body.name;
    let logo=req.body.logo;
    let city=req.body.city;

    let user=await db.user.findByPk(id);
    let count=await db.user.count({where:{
        username,
        id: {


            [Op.ne]: id

          }


    }});

    if(count>0){

        return res.error(422,"username is exists in our data")
    }
    
    if (logo != undefined) {

        hash = await util.encodeImageToBlurhash(logo)
        logo = await util.rename(logo, "public/user")
    }else{

        logo=user.logo;
        hash=user.hash;

    }

    await db.user.update({logo,hash,username,name,city},{where:{id}})

    res.success(null,"the profile was updated successfully")
    
    


}



exports.showuser=async(req,res,next)=>{

    let id=req.params.id;
    let user=await db.user.findByPk(id,{

        include:[db.recipe,
            {association:"followby",through: { attributes: []}},
            {association:"follower",through: { attributes: []}},

        ]


    });
    let isfollow=await db.follow.count({where:{follower_id:id}});

    user = user.toJSON();

    user.isFollow=isfollow==0?false:true;
    
    return res.success(user,"this is user info");


}