import sequelize from "../db/dbConfig.js";
import { DataTypes } from "sequelize";

const Order_Item = sequelize.define("order_item", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
},{
    timestamps: false
});
sequelize.sync()
    .then(result => {
        console.log("order_items table created....");
    }).catch(err => {
        console.log(err);
    })

export default Order_Item;