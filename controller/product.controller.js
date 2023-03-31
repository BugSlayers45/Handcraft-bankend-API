import {Product} from "../model/association.js";
import { Op } from "sequelize";

export const saveProduct = async (request, response, next) => {
    try {
        let productList = request.body.products;

        for (let product of productList) {
            let { title, description, price, discount, rating, stock, categoryName, thumbnail, sellerId, keyword } = product

            let imageArray = ""
            for (let image of product.images) {
                imageArray = imageArray + image + " ";
            }
            await Product.create({
                title: title, description: description, price: price, discount: discount, rating: rating, stock: stock, categoryName: categoryName, thumbnail: thumbnail, sellerId: sellerId, images: imageArray, keyword: keyword
            })
        }
        return response.status(200).json({ message: "product inserted....", status: true });

    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    }
}

export const list = async (request, response, next) => {
    try {
        const product = await Product.findAll()
        console.log(product);
        return response.status(200).json({ product: product, status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    }
}

export const getProductByCategory = (request, response, next) => {
    Product.findAll({
        where: { categoryName: request.params.categoryName }
    }).then(result => {
        console.log(result);
        return response.status(200).json({ product: result, status: true });
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    })
}

export const getProductByPk = (request, response, next) => {
    Product.findByPk(request.params.id, { raw: true })
        .then(result => {
            console.log(result);
            return response.status(200).json({ product: result, status: true });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error", status: false });
        });
}

export const search = (request, response, next) => {
    Product.findAll({
        where: {
            title: { [Op.like]: "%" + request.params.letter + "%" }
        }
    }).then(result => {
        console.log(result);
        return response.status(200).json({ product: result, status: true });
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    })
}

export const searchByKeyword = (request, response, next) => {
    Product.findAll({
        where: {
            // title: { [Op.like]: "%" + request.params.keyword + "%" },
            // description: { [Op.like]: "%" + request.params.keyword + "%" },
            keyword: { [Op.like]: "%" + request.params.keyword + "%" }
        }
    }).then(result => {
        return response.status(200).json({ product: result, status: true });
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    })
}


