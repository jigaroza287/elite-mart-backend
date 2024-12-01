import { DataTypes, Model, Sequelize } from "sequelize";

class Product extends Model {
  public id!: number;
  public categoryId!: number;
  public name!: string;
  public description!: string;
  public gender!: "Men" | "Women" | "Children" | "Unisex";
  public ratings!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        categoryId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        gender: {
          type: DataTypes.ENUM("Men", "Women", "Children", "Unisex"),
          allowNull: false,
        },
        ratings: {
          type: DataTypes.DECIMAL(3, 2),
          allowNull: true,
        },
      },
      { sequelize, tableName: "products", timestamps: true }
    );
  }
}

export default Product;
