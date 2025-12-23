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

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/ration", rationRoutes);

app.use("/api/leftover", leftoverRoutes);
app.use("/api/milk", milkRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/report", reportRoutes);

export default app;
