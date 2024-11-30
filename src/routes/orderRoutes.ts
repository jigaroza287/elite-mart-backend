import { Router } from "express";
import { createOrder, getUserOrders } from "../controllers/orderController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authenticate, createOrder);
router.get("/:userId", authenticate, getUserOrders);

export default router;
