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
import WishlistItem from "./WishlistItem.model.js";
// Product Category Connect

Category.hasMany(Product, {
    foreignKey: "categoryId"
})

Product.belongsTo(Category, {
    foreignKey: "categoryId", targetKey: "id"
})

// Product SellerDetails Connect

SellerDetail.hasMany(Product, {
    foreignKey: "sellerId"
})

Product.belongsTo(SellerDetail, {
    foreignKey: "sellerId", targetKey: "id"
})

// Customer Product Cart CartItem Connect

Customer.hasOne(Cart, {
    foreignKey: "customerId"
})

Cart.belongsTo(Customer, {
    foreignKey: "customerId", targetKey: "id"
})

Product.belongsToMany(Cart, {
    through: CartItem, foreignKey: "orderdetailId", targetKey: "id"
});
Cart.belongsToMany(Product, { through: CartItem });

// Product Customer OrderDetail and Order_items Connect

Customer.hasMany(OrderDetail, {
    foreignKey: "customerId"
});
OrderDetail.belongsTo(Customer, {
    foreignKey: "customerId", targetKey: "id"
});

OrderDetail.belongsToMany(Product, { through: Order_Item });
Product.belongsToMany(OrderDetail, { through: Order_Item });


// Wishlist connect Customer and Product

Customer.hasOne(Wishlist, {
    foreignKey: "customerId"
});
Wishlist.belongsTo(Customer, {
    foreignKey: "customerId", targetKey: "id"
});
// Product.belongsToMany(Wishlist, {
//     through: WishListItem, foreignKey: "orderdetailId", targetKey: "id"
// });
// Wishlist.belongsToMany(Product, { through: WishlistItem });


// Feedback Connect Customer and Product

Customer.hasMany(Feedback, {
    foreignKey: "customerId"
})
Feedback.belongsTo(Customer, {
    foreignKey: "customerId", targetKey: "id"
})
Product.hasMany(Feedback, {
    foreignKey: "productId"
})
Feedback.belongsTo(Product, {
    foreignKey: "productId", targetKey: "id"
})


Product.belongsToMany(Wishlist, {
        through: WishlistItem, foreignKey: "productId", targetKey: "id"
    });

Wishlist.belongsToMany(Product, { through: WishlistItem });
    

export { Category, Customer, Product, SellerDetail, OrderDetail, Order_Item, Cart, CartItem, Wishlist,WishlistItem, Feedback }

