import sequelize from "../config/db";
import Category from "./category";
import Product from "./product";
import ProductVariant from "./productVariants";
import User from "./user";
import Order from "./order";
import Wishlist from "./wishlist";
import WishlistItems from "./wishlistItems";
import { setupAssociations } from "./associations";
import { seedDatabase } from "../queryExamples/productQueries";

Category.initModel(sequelize);
Product.initModel(sequelize);
ProductVariant.initModel(sequelize);
User.initModel(sequelize);
Order.initModel(sequelize);
Wishlist.initModel(sequelize);
WishlistItems.initModel(sequelize);

setupAssociations();

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
