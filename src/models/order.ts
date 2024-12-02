import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./";

interface ProductInOrder {
  productVariantId: number;
  quantity: number;
}

class Order extends Model {
  public id!: number;
  public userId!: number;
  public products!: ProductInOrder[];
  public totalAmount!: number;
  public status!: "pending" | "complete" | "cancel";

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
        products: {
          type: DataTypes.ARRAY(DataTypes.JSON),
          allowNull: false,
        },
        totalAmount: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("pending", "complete", "cancel"),
          allowNull: false,
          defaultValue: "pending",
        },
      },
      { sequelize, tableName: "orders" }
    );
  }
}

export default Order;
