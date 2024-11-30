import { Request, Response } from "express";
import { Product } from "../models";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const product = await Product.create({ name, price, stock });
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
