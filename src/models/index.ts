import sequelize from "../config/db";
import Product from "./product";
import User from "./user";
import Order from "./order";

Product.initModel(sequelize);
User.initModel(sequelize);
Order.initModel(sequelize);

export { sequelize, Product, User, Order };
