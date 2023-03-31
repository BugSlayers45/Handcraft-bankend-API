import sequelize from "../db/dbConfig.js"
import { DataTypes } from "sequelize"
const Product = sequelize.define("product", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(4000),
    },

    price: {
        type: DataTypes.INTEGER
    },
    discount: {

        type: DataTypes.FLOAT
    },
    rating: {
        type: DataTypes.INTEGER
    },
    stock: {
        type: DataTypes.INTEGER
    },
    categoryId: {
        type: DataTypes.INTEGER
    },
    thumbnail: {
        type: DataTypes.STRING
    },
    images: {
        type: DataTypes.STRING(1500)
    },
    sellerDetailId: {
        type: DataTypes.INTEGER
    },
    keyword: {
        type: DataTypes.STRING(2000)
    }
});

sequelize.sync().then(result => {
    console.log("PRODUCT TABLE CREATED")
}).catch(err => {
    console.log(err);
})
export default Product;