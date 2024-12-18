import { Category, Product, ProductVariant } from "../models";
import { Op } from "sequelize";

export const getCategories = async () => {
  return await Category.findAll({
    attributes: ["id", "name", "image"],
    order: ["name"],
  });
};

export const getTopSellingProducts = async () => {
  return await Product.findAll({
    where: { ratings: { [Op.gte]: 4 } },
    include: [
      {
        model: ProductVariant,
        as: "variants",
      },
    ],
    order: [["ratings", "DESC"]],
    limit: 10,
  });
};

export const getNewArrivals = async () => {
  return await Product.findAll({
    include: [
      {
        model: ProductVariant,
        as: "variants",
      },
    ],
    order: [["createdAt", "DESC"]],
    limit: 10,
  });
};
