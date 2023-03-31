import sequelize from "../db/dbConfig.js";
import { DataTypes } from "sequelize";

const Order_Item = sequelize.define("order_item", {
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,

    }
});
sequelize.sync()
    .then(result => {
        console.log("order_items table created....");
    }).catch(err => {
        console.log(err);
    })

export default Order_Item;