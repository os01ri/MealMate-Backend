const db = require("../../models");
const convert = require("convert-units");
exports.store = async (req, res, next) => {

    let user_id = req.user.id;
    let order = await db.order.create({ user_id });

    let totalPrice = 0;
    let ingredients = req.body.ingredients;

    let orderIngredient = await Promise.all(ingredients.map(async (object) => {

        let ingredient = await db.ingredient.findByPk(object.ingredient_id, { include: [db.unit] });
        let unit = await db.unit.findByPk(object.unit_id);
        let priceOne = ingredient.price / ingredient.price_by;
        let ingredientcode = ingredient.unit.code;
        let price = convert(priceOne).from(ingredientcode).to(unit.code);
        totalPrice += price * object.quantity;
        let count = await db.grocery.count({ where: { user_id, ingredient_id: object.ingredient_id } });
        if (count == 0) {

            await db.grocery.create({ user_id, ingredient_id: object.ingredient_id, quantity: object.quantity, unit_id: object.unit_id });
        } else {

            let grocery = await db.grocery.findOne({ where: { user_id, ingredient_id: object.ingredient_id }, include: [db.unit] });
            let newquantity = grocery.quantity + convert(object.quantity).from(ingredientcode).to(grocery.unit.code);
            await db.grocery.update({ quantity: newquantity }, { where: { user_id, ingredient_id: object.ingredient_id } });

        }



        return {

            order_id: order.id,
            quantity: object.quantity,
            unit_id: object.unit_id,
            ingredient_id: object.ingredient_id,
            price: price * object.quantity

        }


    }));

    await db.orderitem.bulkCreate(orderIngredient);

    await db.order.update({ totalPrice }, { where: { id: order.id } })
    order = await db.order.findByPk(order.id, { include: [db.ingredient] });
    return res.success(order);





}


exports.getAllOrder = async (req, res, next) => {

    let user_id = req.user.id;
    let orders = await db.order.findAll({ where: { user_id }, include: [db.ingredient] });

    return res.success(orders);


}



exports.getallorder = async (req, res, next) => {


    let orders = await db.order.findAll({ include: [db.ingredient, db.user] });

    return res.success(orders, "this is all order")
}



exports.changestatus = async (req, res, next) => {

    let status = req.body.status;
    let id = req.params.id;
    let order = await db.order.update({ status }, { where: { id } });
    return res.status(200).json({}, "the order status was updated successfully");

}