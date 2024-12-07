import { DataTypes, Model, Sequelize } from "sequelize";
import { Category } from "./";

class Product extends Model {
  public id!: number;
  public categoryId!: number;
  public name!: string;
  public description!: string;
  public demographic!: "Men" | "Women" | "Kids" | "Unisex";
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
          references: {
            model: Category,
            key: "id",
          },
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        demographic: {
          type: DataTypes.ENUM("Men", "Women", "Kids", "Unisex"),
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
