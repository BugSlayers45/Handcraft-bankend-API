import sequelize from "../db/dbConfig.js";
import { DataTypes } from "sequelize";

const Wishlist = sequelize.define("wishlist", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
},{
    timestamps: false
});
sequelize.sync()
    .then(result => {
        console.log("Wishlist table created");
    }).catch(err => {
        console.log(err);
    })

export default Wishlist;

