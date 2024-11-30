import { Router, Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../controllers/userController";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/validations/userValidation";
import { validationResult } from "express-validator";

const router = Router();

const validateInputs = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

router.post("/register", registerValidation, validateInputs, registerUser);
router.post("/login", loginValidation, validateInputs, loginUser);

export default router;
