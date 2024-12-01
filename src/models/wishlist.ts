import { DataTypes, Model, Sequelize } from "sequelize";

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
        },
      },
      { sequelize, tableName: "Wishlist", timestamps: true }
    );
  }
}

export default Wishlist;
