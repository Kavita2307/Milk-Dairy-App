import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

import animalRoutes from "./routes/animal.routes";
import rationRoutes from "./routes/ration.routes";
import leftoverRoutes from "./routes/leftover.routes";
import milkRoutes from "./routes/milk.routes";
import ingredientRoutes from "./routes/ingredient.routes";
import analyticsRoutes from "./routes/analytics.routes";
import reportRoutes from "./routes/report.routes";
import { profile } from "console";
import profileRoutes from "./routes/profile.routes";

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.get("/", (_req, res) => res.send({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/ration", rationRoutes);

app.use("/api/leftover", leftoverRoutes);
app.use("/api/milk", milkRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/report", reportRoutes);

export default app;
