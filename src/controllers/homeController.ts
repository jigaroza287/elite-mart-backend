import { Request, Response } from "express";
import {
  getCategories,
  getNewArrivals,
  getTopSellingProducts,
} from "../services/homeService";

export const getHomePageData = async (_: Request, res: Response) => {
  try {
    const categories = await getCategories();
    const topSellingProducts = await getTopSellingProducts();
    const newArrivals = await getNewArrivals();

    res.status(200).json({
      success: true,
      data: {
        categories,
        topSellingProducts,
        newArrivals,
      },
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    return;
  }
};
