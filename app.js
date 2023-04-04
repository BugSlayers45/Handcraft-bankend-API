import express from "express";
import bodyParser from "body-parser";

import AdminRoute from "./routes/admin.route.js";
import CustomerRoute from "./routes/customer.route.js";
import SellerRoute from "./routes/seller.route.js";
import CategoryRoute from "./routes/category.route.js";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/admin",AdminRoute);
app.use("/customer",CustomerRoute);
app.use("/seller",SellerRoute);
app.use("/category",CategoryRoute);


app.listen(4000,()=>{
    console.log("server started ....4000");
})