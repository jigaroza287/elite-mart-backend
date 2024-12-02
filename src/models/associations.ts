import {
  Category,
  Product,
  ProductVariant,
  User,
  Wishlist,
  WishlistItems,
} from "./";

export const setupAssociations = () => {
  Category.hasMany(Product, {
    foreignKey: "categoryId",
    as: "products",
  });

  Product.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
  });

  Product.hasMany(ProductVariant, {
    foreignKey: "productId",
    as: "variants",
  });

  ProductVariant.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
  });

  User.hasMany(Wishlist, {
    foreignKey: "userId",
    as: "wishlists",
  });

  Wishlist.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  Wishlist.hasMany(WishlistItems, {
    foreignKey: "wishlistId",
    as: "wishlistItems",
  });

  WishlistItems.belongsTo(Wishlist, {
    foreignKey: "wishlistId",
    as: "wishlist",
  });
};
