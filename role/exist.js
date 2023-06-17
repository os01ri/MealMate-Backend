const database = require("../models/index");
const rule = (model, name) => async (value) => {

    if (!value) {

        return;
    }

    let count = await database.sequelize.model(model).count({
        where: {

            [name]: value

        }
    });
    if (count == 0) {
        throw new Error(`the ${name} is not exists in our ${model} database`);
    }


}


module.exports = rule;