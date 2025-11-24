// import app from "./app";
// import cors from "cors";
// app.use(cors());

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
import express from "express";
import cors from "cors";
import animalRoutes from "./routes/animal.routes";
import groupRoutes from "./routes/group.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/groups", groupRoutes);

app.listen(4000, () => console.log("Server running on port 4000"));
