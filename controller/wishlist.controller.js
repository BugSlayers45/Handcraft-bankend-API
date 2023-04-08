import { validationResult } from "express-validator";
import { Wishlist,WishlistItem, Product } from "../model/association.js";
import sequelize from "../db/dbConfig.js";

export const addToWishlist = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ error: "Bad request", errors: errors.array(), status: false });

    const t = await sequelize.transaction();
    try {
        let wishlist = await Wishlist.findOne({
            raw: true,
            where: {
                customerId: request.body.customerId
            }
        });

        if (wishlist) {
            let Item = await WishlistItem.findOne({
                row: true,
                where: {
                wishlistId: wishlist.id, productId: request.body.productId
                }
            });
            if (Item)
                return response.status(200).json({ message: "Product is already added in wishlist", status: true });

            await WishlistItem.create({
                productId: request.body.productId,
                wishlistId: wishlist.id
            }).then(result => {
                return result.dataValues
            });
            return response.status(200).json({ message: "Item added in wishlist", status: true });
        }
        else {
            let wishlist = await Wishlist.create({ customerId: request.body.customerId }, { transaction: t })
                .then(result => { return result.dataValues });

            let wishlistItem = await WishlistItem.create({ productId: request.body.productId, wishlistId: wishlist.id }, { transaction: t })
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

export const viewWishList= (request, response, next) => {
    Wishlist.findAll({
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

export const removeFromWishlist = async (request, response, next) => {
    try {
        let wishlist = await Wishlist.findOne({
            raw: true, where: { customerId: request.body.customerId }
        })
        if (!wishlist)
            return response.status(404).json({ error: "Requested resources not found", status: false });
        let status = await WishlistItem.destroy({ where: { wishlistId: wishlist.id, productId: request.body.productId } });

        if (status)
            console.log(status);
        return response.status(200).json({ message: "Product removed from wishlist", status: true })
        return response.status(404).json({ error: "Requested resources not found", status: false });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Internal server error", status: false });
    }
}
