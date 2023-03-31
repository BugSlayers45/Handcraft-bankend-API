import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";


const CartItem = sequelize.define("cart_item", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
});

sequelize.sync().then(result => {
    console.log("Cart_items table Created....");
})
    .catch(err => {
        console.log(err);
    });

export default CartItem;