import { Request, Response } from "express";
import {
  getCategories,
  getTopSellingProducts,
  getNewArrivals,
} from "../services/homeService";

export const getHomePageData = async (req: Request, res: Response) => {
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
    console.error("Error fetching home page data:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    return;
  }
};
