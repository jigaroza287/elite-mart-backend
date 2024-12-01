import { Request, Response } from "express";
import { Product, ProductVariant } from "../models";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { categoryId, name, description, gender, ratings } = req.body;
    const product = await Product.create({
      categoryId,
      name,
      description,
      gender,
      ratings,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
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
