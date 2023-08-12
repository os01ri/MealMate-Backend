const { sendMail } = require("../../config/mail");
const db = require("../../models");
const util = require("../../util/helper");
const mail = require("../../config/mail");

exports.register = async (req, res, next) => {


    let name = req.body.name;
    let username = req.body.username;

    let email = req.body.email;
    let password = req.body.password;
    let logo = req.body.logo;
    let hash = req.body.logo;
    let code = util.randomcode();
    if (logo != undefined) {

        hash = await util.encodeImageToBlurhash(logo)
        logo = await util.rename(logo, "public/user")
    }

    let user = await db.user.create({ name, email, password, logo, code, username, hash })


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
            "logo",
            "hash",
            "status",

                [db.Sequelize.fn('COUNT', db.Sequelize.col('follower.id')), 'followers'],
                [db.Sequelize.fn('COUNT', db.Sequelize.col('followby.id')), 'following'],



        ],

        
        include:[

            {association:"unlikeingredient",through: { attributes: []}},
            {association:"follower",

            attributes:[

            ]
            
        },
            {association:"followby",
        
            attributes:[

            ]}
    
        ],


    });

    res.success(user,"this is your info")
}