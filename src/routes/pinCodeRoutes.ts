import { Router } from "express";
import { checkPinCode } from "../controllers/pinCodeController";

const router = Router();

router.get("/check-pin", checkPinCode);

export default router;
