import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./";

class Wishlist extends Model {
  public id!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    Wishlist.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: "id",
          },
        },
      },
      { sequelize, tableName: "wishlists", timestamps: true }
    );
  }
}

export default Wishlist;
