import { OrderDetail } from "../model/association.js";

export const saveOrder = async (request, response, next) => {
    try {
        let orderDetail = await OrderDetail.create(request.body);
        return response.status(200).json({ message: "Order Placed", status: true });

    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false }); ssss
    }
}
