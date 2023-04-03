import sequelize from "../db/dbConfig.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define("category", {
    categoryName: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps: false
})
sequelize.sync()
    .then(result => {
        console.log("category table created");
    }).catch(err => {
        console.log(err);
    })

export default Category;