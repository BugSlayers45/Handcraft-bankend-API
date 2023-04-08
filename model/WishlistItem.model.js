import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";
import { validationResult } from "express-validator";


const WishlistItem = sequelize.define("wishlist_item", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
});

sequelize.sync()
    .then(result => {
        console.log("wishlist_items table Created....");
    })
    .catch(err => {
        console.log(err);
    });

export default WishlistItem;