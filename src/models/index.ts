import sequelize from "../config/db";
import Category from "./category";
import Product from "./product";
import ProductVariant from "./productVariants";
import User from "./user";
import Order from "./order";
import Wishlist from "./wishlist";
import WishlistItems from "./wishlistItems";

Product.initModel(sequelize);
User.initModel(sequelize);
Order.initModel(sequelize);

export {
  sequelize,
  Category,
  Product,
  ProductVariant,
  User,
  Order,
  Wishlist,
  WishlistItems,
};
