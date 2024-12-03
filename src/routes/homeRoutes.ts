import { Router } from "express";
import { getHomePageData } from "../controllers/homeController";

const router = Router();

router.get("/", getHomePageData);

export default router;
