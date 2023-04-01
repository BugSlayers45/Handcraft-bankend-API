import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";


const SellerDetail = sequelize.define("sellerDetail", {
    sellerName: {
        type: DataTypes.STRING,
        allowNull: false
  
     },
    sellerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    sellerPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sellerContact: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true
        }
    },
    sellerAddress:
    {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Inactive"
    }
});

sequelize.sync()
    .then(result => {
        console.log("SellerDetails tables Created....");
    })
    .catch(err => {
        console.log(err);
    });

export default SellerDetail;