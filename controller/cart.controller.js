import { validationResult } from "express-validator";
import { Cart, CartItem, Product } from "../model/association.js";
import sequelize from "../db/dbconfig.js";

export const addToCart = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ error: "Bad request", errors: errors.array(), status: false });

    const t = await sequelize.transaction();
    try {
        let cart = await Cart.findOne({
            raw: true,
            where: {
                customerId: request.body.customerId
            }
        });

        if (cart) {
            let cartItem = await CartItem.findOne({
                row: true,
                where: {
                    cartId: cart.id, productId: request.body.productId
                }
            });
            if (cartItem)
                return response.status(200).json({ message: "Product is already added in cart", status: true });

            await CartItem.create({
                productId: request.body.productId,
                cartId: cart.id
            }).then(result => {
                return result.dataValues
            });
            return response.status(200).json({ message: "Item added in cart", status: true });
        }
        else {
            let cart = await Cart.create({ customerId: request.body.customerId }, { transaction: t })
                .then(result => { return result.dataValues });

            let cartItem = await CartItem.create({ productId: request.body.productId, cartId: cart.id }, { transaction: t })
                .then(result => {
                    return result.dataValues
                });
            await t.commit();
            return response.status(200).json({ message: "Item is added in cart", status: true })
        }
    } catch (err) {
        console.log(err);
        await t.rollback();

        return response.status(505).json({ error: "Internal server error", status: false });
    }

}

export const cartList = (request, response, next) => {
    Cart.findAll({
        where: {
            customerId: request.body.customerId
        },
        include: { model: Product }
    })
        .then(result => {
            return response.status(200).json({ "cart_list": result, status: true });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error", status: false });
        })
}

export const remove = async (request, response, next) => {
    try {
        let cart = await Cart.findOne({
            raw: true, where: { customerId: request.body.customerId }
        })
        if (!cart)
            return response.status(404).json({ error: "Requested resources not found", status: false });
        let status = await CartItem.destroy({ where: { cartId: cart.id, productId: request.body.productId } });

        if (status)
            console.log(status);
        return response.status(200).json({ message: "Product removed from cart", status: true })
        return response.status(404).json({ error: "Requested resources not found", status: false });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Internal server error", status: false });
    }
}
