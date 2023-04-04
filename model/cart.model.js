import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";


const Cart = sequelize.define("cart", {
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
});

sequelize.sync().then(result => {
    console.log("Cart table Created....");
}).catch(err => {
    console.log(err);
})

export default Cart;