import { Product, SellerDetail } from "../model/association.js";
import { validationResult } from "express-validator"
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
// import SellerDetail from "../model/seller_details.model.js";


export const productList = async (request, response, next) => {
    Product.findAll({
        where: {
            sellerId: request.params.sellerId
        }
    }).then(result => {
        return response.status(200).json({ productsList: result, status: true })
    }).catch(err => {
        return response.status(500).json({ error: "INTERNAL SERVER ERROR", status: false })
    })
}
export const updateProduct = (request, response, next) => {
    Product.findByPk(request.body.id).then(product => {
        console.log(product.title)
        Product.update({
            title: request.body.title,
            description: request.body.description,
            discount: request.body.discount,
            rating: request.body.rating,
            categoryName: request.body.categoryName,
            thumbnail: request.body.thumbnail,
            images: request.body.images,
            keyword: request.body.keyword
        }, { where: { id: product.id } }).then(result => {
            return response.status(200).json({ message: "Product detail updated", status: true })
        }).catch(err => {
            return response.status(500).json({ error: "INTERNAL SERVER ERROR", status: false })
        })
    }).catch(err => {
        console.log(err);
    })
}

export const signin = (request, response, next) => {
    try {
        let Seller = SellerDetail.findOne({
            raw: true,
            where: {
                email: request.body.selleEmail
            }
        });
        if (Seller) {
            let status = bcrypt.compare(request.body.sellerPassword, Seller.password)
            if (status) {
                let payload = { subject: SellerDetail.selleEmail };
                let token = Jwt.sign(payload, 'qwertyuio;lkjhgfwertj')
                return response.status(200).json({ message: "SignIn successfull", token: token, status: true });
            }
            return response.status(400).json({ message: "Bad request", status: false });
        }

    } catch (err) {
        return response.status(500).json({ error: "Internal server error", status: false })
    }
}

export const signup = async (request, response, next) => {
    const error = await validationResult(request);
    if (!error.isEmpty())
        return response.status(400).json({ error: "Bad request", message: error.array() });
    let saltkey = await bcrypt.genSalt(10);
    let encrypPassword = await bcrypt.hash(request.body.sellerPassword, saltkey);
    request.body.sellerPassword = encrypPassword;

    let SellerDetails = SellerDetail.create(request.body)
        .then(result => {
            return response.status(200).json({ seller: SellerDetails, status: true });
        }).catch(err => {
            console.log(err);
            return response.status(400).json({ error: "Internal server error", status: false });
        })
}

