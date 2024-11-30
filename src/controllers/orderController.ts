import { Request, Response } from "express";
import { Order, Product } from "../models";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;
    const product = await Product.findByPk(productId);

    if (!product || product.stock < quantity) {
      res.status(400).json({ error: "Insufficient stock" });
      return;
    }

    const order = await Order.create({ userId, productId, quantity });
    await product.update({ stock: product.stock - quantity });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Order creation failed" });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { userId },
      include: [Product],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
