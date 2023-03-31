import Cart from "./cart.model.js";
import CartItem from "./cart_item.model.js";
import Category from "./category.model.js";
import Customer from "./customer.model.js";
import OrderDetail from "./order_detail.model.js";
import Order_Item from "./order_item.js";
import Product from "./product.model.js";
import SellerDetail from "./seller_details.model.js";
import Wishlist from "./wishlist.model.js";

SellerDetail.hasMany(Product);
Product.belongsTo(SellerDetail);


Category.hasMany(Product);
Product.belongsTo(Category);


Customer.hasOne(Cart);
Cart.belongsTo(Customer);

Product.belongsToMany(Cart,{through:CartItem});
Cart.belongsToMany(Product,{through:CartItem});


Customer.hasMany(OrderDetail);
OrderDetail.belongsTo(Customer);

OrderDetail.belongsToMany(Product,{through:Order_Item});
Product.belongsToMany(OrderDetail,{through:Order_Item});

// Customer.belongsTo(Product,{through: Wishlist})
// Product.belongsTo(Customer,{through: Wishlist});


export {Category,Product,SellerDetail,Customer,Cart,CartItem,OrderDetail,Order_Item}