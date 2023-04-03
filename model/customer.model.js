import sequelize from "../db/dbConfig.js";
import { DataTypes } from "sequelize";

const Customer = sequelize.define("customer", {
    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    customerPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerContact: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true
        }
    }
},{
    timestamps: false
});
sequelize.sync()
.then(result => {
    console.log("Customers table created.....");
}).catch(err => {
    console.log(err);
})

export default Customer;