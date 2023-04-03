import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";


const Admin = sequelize.define("admin", {
    adminName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adminEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    adminPassword: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync({ alter: false, force: false })
    .then(result => {
        console.log("Admin table Created....");
    })
    .catch(err => {
        console.log(err);
    });

export default Admin;