import { Request, Response } from "express";
import { Op, where } from "sequelize";
import { Product, ProductVariant } from "../models";

const FILTERS = {
  TOP_RATED: "top_rated",
  NEW_ARRIVALS: "new_arrivals",
  DISCOUNTS: "discounts",
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { categoryId, name, description, demographic, ratings } = req.body;
    const product = await Product.create({
      categoryId,
      name,
      description,
      demographic,
      ratings,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      page = 1,
      limit = 20,
      categoryId,
      search,
      sortBy,
      sortOrder = "ASC",
    } = req.query;

    const currentPage = parseInt(page as string, 10);
    const itemsPerPage = parseInt(limit as string, 10);
    const offset = (currentPage - 1) * itemsPerPage;

    const queryOptions: any = {
      where: {},
      include: [
        {
          model: ProductVariant,
          as: "variants",
          required: true,
        },
      ],
      limit: itemsPerPage,
      offset,
    };

    switch (filter) {
      case FILTERS.TOP_RATED:
        queryOptions.order = [["ratings", "DESC"]];
        break;
      case FILTERS.NEW_ARRIVALS:
        queryOptions.order = [["createdAt", "DESC"]];
        break;
      case FILTERS.DISCOUNTS:
        queryOptions.where.discount = { [Op.gt]: 0 };
        break;
      default:
        break;
    }

    if (categoryId) {
      queryOptions.where.categoryId = categoryId;
    }

    if (search) {
      queryOptions.where.name = { [Op.iLike]: `%${search}%` };
    }

    if (sortBy) {
      queryOptions.order = [[sortBy as string, sortOrder as string]];
    }

    const productCount = await Product.count({ where: queryOptions.where });
    const products = await Product.findAll(queryOptions);

    const totalPages = Math.ceil(productCount / itemsPerPage);

    res.json({
      success: true,
      data: products,
      currentPage,
      totalPages,
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProductVariant = async (req: Request, res: Response) => {
  try {
    const { productId, size, color, sku, price, discount, stock, images } =
      req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found." });
      return;
    }

    const productVariant = await ProductVariant.create({
      productId,
      size,
      color,
      sku,
      price,
      discount,
      stock,
    });

    res.status(201).json(productVariant);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product variant" });
  }
};
