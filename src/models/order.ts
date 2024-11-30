import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./user";
import Product from "./product";

class Order extends Model {
  public id!: number;
  public userId!: number;
  public productId!: number;
  public quantity!: number;

  static initModel(sequelize: Sequelize) {
    Order.init(
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
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: Product,
            key: "id",
          },
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { sequelize, tableName: "orders" }
    );
  }
}

export default Order;
