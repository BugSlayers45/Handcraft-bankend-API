import sequelize from "../db/dbConfig.js";
import { Order_Item, Product } from "../model/association.js";
import OrderDetail from "../model/order_detail.model.js";


export const saveOrder = async (request, response, next) => {
    let t = await sequelize.transaction();
    try {

        let orderDetails = request.body.orderdetails;
        let orderInfo = { ...orderDetails };
        delete orderInfo.orderItem;
        let newOrder = await OrderDetail.create(orderInfo, { transaction: t })
            .then(result => { return result.dataValues });

        let orderItemArray = await orderDetails.orderItem.map((item, index) => {

            item.orderdetailId = newOrder.id;
            return item;
        });

        let orderItem = await Order_Item.bulkCreate(orderItemArray, { transaction: t })
            .then(result => { return result.dataValues });
        await t.commit();
        return response.status(200).json({ message: "OrderItem created..", status: true });
    }
    catch (err) {
        console.log(err);
        await t.rollback();
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

//id
export const viewOrderdetail = (request, response, next) => {
    OrderDetail.findAll({
        where: {
            id: request.body.id
        },
        include: { model: Product }
    }).then(result => {
        return response.status(200).json({ "Order details :-----": result, status: true })
    })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error", status: false });
        })
}

