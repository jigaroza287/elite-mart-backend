import express from "express";
import cors from "cors";
import helmet from "helmet";
import { HomeRoutes, ProductRoutes, UserRoutes, OrderRoutes } from "./routes";
import PinCodeRoutes from "./routes/pinCodeRoutes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/home", HomeRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/pin", PinCodeRoutes);

export default app;
