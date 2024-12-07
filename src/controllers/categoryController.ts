import { Request, Response } from "express";
import { Category } from "../models";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, image } = req.body;
    const category = await Category.create({ name, image });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
