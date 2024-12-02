import { DataTypes, Model, Sequelize } from "sequelize";
import { Product } from "./";

class ProductVariant extends Model {
  public id!: number;
  public productId!: number;
  public size!: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
  public color!: string;
  public sku!: string;
  public price!: number;
  public discount!: number;
  public stock!: number;
  public images!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    ProductVariant.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: Product,
            key: "id",
          },
        },
        size: {
          type: DataTypes.ENUM("XS", "S", "M", "L", "XL", "XXL", "XXXL"),
          allowNull: false,
        },
        color: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sku: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        discount: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: true,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
      },
      { sequelize, tableName: "productVariants", timestamps: true }
    );
  }
}

export default ProductVariant;
