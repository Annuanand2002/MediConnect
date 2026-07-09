import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRoutes from "./interfaces/routes/admin.route.js";
import {errorHandler} from "./interfaces/middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
res.send("API is running...");
});

export default app;