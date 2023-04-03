import Cart from "./cart.model.js";
import CartItem from "./cart_item.model.js";
import Category from "./category.model.js";
import Customer from "./customer.model.js";
import Feedback from "./feedback.model.js";
import OrderDetail from "./order_detail.model.js";
import Order_Item from "./order_item.js";
import Product from "./product.model.js";
import SellerDetail from "./seller_details.model.js";
import Wishlist from "./wishlist.model.js";

SellerDetail.hasMany(Product);
Product.belongsTo(SellerDetail);


Category.hasMany(Product);
Product.belongsTo(Category);


Customer.hasOne(Cart,{
    foreignKey: "customerId"
});
Cart.belongsTo(Customer,{
    foreignKey:"customerId",targetKey:"id"
});

Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });


Customer.hasMany(OrderDetail,{
    foreignKey:"customerId"
});
OrderDetail.belongsTo(Customer,{
    foreignKey:"customerId",targetKey:"id"
});

OrderDetail.belongsToMany(Product, { through: Order_Item });
Product.belongsToMany(OrderDetail, { through: Order_Item });

// Customer.belongsTo(Product, { through: Wishlist })
// Product.belongsTo(Customer, { through: Wishlist });

Customer.hasMany(Wishlist,{
    foreignKey:'customerId'
})

Wishlist.belongsTo(Customer,{
    foreignKey:"customerId",targetKey:"id"
})

Product.hasMany(Wishlist,{
    foreignKey:'productId'
})

Wishlist.belongsTo(Product,{
    foreignKey:"productId",targetKey:"id"
})

// customer and product connect feedbach
Customer.hasMany(Feedback,{
    foreignKey: "customerId" 
})

Feedback.belongsTo(Customer,{
    foreignKey: "customerId",targetKey:"id"
})

Product.hasMany(Feedback,{
    foreignKey:"productId"
})
Product.belongsTo(Feedback,{
    foreignKey: "productId",targetKey:"id"
})


export { Category, Product, SellerDetail, Customer, Cart, CartItem, OrderDetail, Order_Item,Wishlist,Feedback }