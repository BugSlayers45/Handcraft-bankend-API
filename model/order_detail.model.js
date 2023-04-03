import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const OrderDetail = sequelize.define("order_detail", {
    date: {
        type: DataTypes.STRING,
        defaultValue: new Date().toString().substring(4, 15).replaceAll(' ', " ")
    },
    billAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contactPerson: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: false
        }
    },
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending"
    },
    paymentMode: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "COD"
    },

},{
    timestamps: false
});

sequelize.sync()
    .then(result => {
        console.log("OrderDetails table created...");
    })
    .catch(err => {
        console.log(err);
    })

export default OrderDetail;