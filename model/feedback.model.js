import sequelize from "../db/dbConfig.js";
import { DataTypes } from "sequelize";

const Feedback = sequelize.define("feedback", {
    review: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.FLOAT
    }
});
sequelize.sync()
    .then(result => {
        console.log("feedbacks table created" + result);
    }).catch(err => {
        console.log(err);
    })

export default Feedback;