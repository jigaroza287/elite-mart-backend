import { DataTypes, Model, Sequelize } from "sequelize";

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public stock!: number;

  static initModel(sequelize: Sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { sequelize, tableName: "products" }
    );
  }
}

export default Product;
