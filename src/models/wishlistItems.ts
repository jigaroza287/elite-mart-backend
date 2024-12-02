import { DataTypes, Model, Sequelize } from "sequelize";
import { Wishlist } from "./";

class WishlistItem extends Model {
  public id!: number;
  public wishlistId!: number;
  public productId!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    WishlistItem.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        wishlistId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: Wishlist,
            key: "id",
          },
        },
        productVariantId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      { sequelize, tableName: "wishlistItems", timestamps: true }
    );
  }
}

export default WishlistItem;
