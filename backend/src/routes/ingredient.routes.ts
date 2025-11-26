import { Router } from "express";
import {
  addIngredient,
  getIngredients,
} from "../controllers/ingredient.controller";

const router = Router();

// router.post("/", addIngredient);
// router.get("/", getIngredients);
router.get("/", listIngredients); // GET /ingredients
router.post("/", createIngredient); // POST /ingredients
router.get("/:id", getIngredient); // GET /ingredients/:id
router.post("/:id/add-stock", addStock); // POST /ingredients/:id/add-stock
router.post("/:id/consume", recordConsumption); // POST /ingredients/:id/consume

export default router;
