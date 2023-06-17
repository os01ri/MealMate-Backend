const database = require("../models/index");
const rule = (model) => async (value) => {

    if (!value) {
        return;
    }
    let ids = JSON.parse(value);

    let count = await database.sequelize.model(model).count({ where: { id: ids } })
    console.log(count)
    if (count != ids.length) {
        throw new Error(`the array id  is not exists in our database table`);
    }


}


module.exports = rule;