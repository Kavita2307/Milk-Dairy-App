import express from "express";
import cors from "cors";
import animalRoutes from "./routes/animal.routes";
import authRoutes from "./routes/auth.routes";
import ingredientRoutes from "./routes/ingredient.routes";
import rationRoutes from "./routes/ration.routes";
import leftoverRoutes from "./routes/leftover.routes";
import milkRoutes from "./routes/milk.routes";
import analyticsRoutes from "./routes/analytics.routes";
import reportRoutes from "./routes/report.routes";
import profileRoutes from "./routes/profile.routes";
import mixRoutes from "./routes/mix.routes";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/ration", rationRoutes);
app.use("/api/mix", mixRoutes);

app.use("/api/leftover", leftoverRoutes);
app.use("/api/milk", milkRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/report", reportRoutes);
app.listen(4000, () => console.log("Server running on port 4000"));
