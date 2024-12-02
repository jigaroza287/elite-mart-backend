import { Request, Response } from "express";
import { Order, ProductVariant } from "../models";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      res
        .status(400)
        .json({ message: "Products are required and should be an array." });
      return;
    }

    let totalAmount = 0.0;
    let productIdsWithInsufficientStock: number[] = [];

    products.map(async (prod) => {
      const product = await ProductVariant.findByPk(prod.productId);

      if (!product || product.stock < prod.quantity) {
        productIdsWithInsufficientStock.push(prod.productId);
      } else {
        totalAmount += product.price * prod.quantity;
      }
    });

    if (productIdsWithInsufficientStock.length > 0) {
      res.status(400).json({
        error:
          "Insufficient stock for product ids " +
          productIdsWithInsufficientStock.join(),
      });
      return;
    }

    const order = await Order.create({ userId, products, totalAmount });
    products.map(async (prod) => {
      const product = await ProductVariant.findByPk(prod.productId);
      if (product && product.stock < prod.quantity) {
        await product.update({ stock: product.stock - prod.quantity });
      }
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Order creation failed" });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({ where: { userId } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
