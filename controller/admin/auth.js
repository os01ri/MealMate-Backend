const db = require("../../models");
const util = require("../../util/helper");
exports.login = async (req, res, next) => {

    let username = req.body.username;
    let password = req.body.password;
    let admin = await db.admin.findOne({
        where: {
            username
        },
        include: {

            model: db.role
        }

    });
    if (admin.comparePassword(password)) {

        admin = admin.toJSON();

        let token = await util.generateToken(admin.id, process.env.ADMIN_TOKEN_KEY, process.env.ADMIN_TOKEN_EXPIRED_AT);
        let refreshToken = await util.generateToken(admin.id, process.env.ADMIN_REFRESH_TOKEN_KEY, process.env.ADMIN_REFRSH_TOKEN_EXPIRED_AT);
        let expired_at = Number.parseInt(process.env.ADMIN_TOKEN_EXPIRED_AT);
        let token_info = {
            token,
            refreshToken,
            expired_at
        };
        admin.token_info = token_info;

        return res.success(admin, "this is your admin information")

    }

    return res.error(403, "the password is not correnct")


}


exports.refreshtoken = async (req, res, next) => {


    let token = await util.generateToken(req.user.id, process.env.ADMIN_TOKEN_KEY, process.env.ADMIN_TOKEN_EXPIRED_AT);
    let refreshToken = await util.generateToken(req.user.id, process.env.ADMIN_REFRESH_TOKEN_KEY, process.env.ADMIN_REFRSH_TOKEN_EXPIRED_AT);
    let expired_at = Number.parseInt(process.env.ADMIN_TOKEN_EXPIRED_AT);

    return res.success({ refreshToken, token, expired_at }, "this is your tokens info")





}


exports.logout = async (req, res, next) => {

    util.logout(req)
        .then(() => res.success({}, "you are logout successfully"))
        .catch(() => res.error(500, 'we have error'))



}



exports.notificationStore=async(req,res,next)=>{


    let title=req.body.title;
    let body=req.body.body;

    await db.notificantion.create({title,body});

    return res.success(null,"the notification was added successfully")

    

}


exports.getallnotification=async(req,res,next)=>{



    let notifications=await db.notificantion.findAll()


    return res.success(notifications,"this is all notification")

}