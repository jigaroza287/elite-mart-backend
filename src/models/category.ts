import { DataTypes, Model, Sequelize } from "sequelize";

class Category extends Model {
  public id!: number;
  public name!: string;

  static initModel(sequelize: Sequelize) {
    Category.init(
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
      },
      { sequelize, tableName: "Category" }
    );
  }
}

export default Category;
