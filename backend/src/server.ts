import app from "./app";
import cors from "cors";
app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
