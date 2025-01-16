import { Request, Response } from "express";
import { Op } from "sequelize";
import { Product, ProductVariant } from "../models";
import { FILTERS, ITEMS_LIMIT } from "../utils/constants";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { categoryId, name, description, details, demographic, ratings } =
      req.body;
    const product = await Product.create({
      categoryId,
      name,
      description,
      details,
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
      limit = ITEMS_LIMIT,
      categoryId,
      search,
      sortBy,
      sortOrder = "ASC",
      demographic,
      minPrice,
      maxPrice,
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
          where: {},
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
        queryOptions.include[0].where.discount = { [Op.gt]: 0 };
        break;
    }

    if (categoryId) {
      queryOptions.where.categoryId = categoryId;
    }

    if (demographic) {
      queryOptions.where.demographic = demographic;
    }

    if (minPrice || maxPrice) {
      if (minPrice) {
        queryOptions.include[0].where.price = {
          ...(queryOptions.include[0].where.price || {}),
          [Op.gte]: parseFloat(minPrice as string),
        };
      }
      if (maxPrice) {
        queryOptions.include[0].where.price = {
          ...(queryOptions.include[0].where.price || {}),
          [Op.lte]: parseFloat(maxPrice as string),
        };
      }
    }

    if (search) {
      queryOptions.where.name = { [Op.iLike]: `%${search}%` };
    }

    if (sortBy === "price") {
      queryOptions.order = [
        [
          { model: ProductVariant, as: "variants" },
          "price",
          (sortOrder as string).toUpperCase(),
        ],
      ];
    } else if (sortBy) {
      queryOptions.order = [
        [sortBy as string, (sortOrder as string).toUpperCase()],
      ];
    }

    const [productCount, products] = await Promise.all([
      Product.count({ where: queryOptions.where }),
      Product.findAll(queryOptions),
    ]);

    const totalPages = Math.ceil(productCount / itemsPerPage);

    res.json({
      success: true,
      data: products,
      meta: {
        productCount,
        currentPage,
        totalPages,
      },
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProductVariant = async (req: Request, res: Response) => {
  try {
    const { productId, size, color, colorCode, sku, price, discount, stock } =
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
      colorCode,
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
