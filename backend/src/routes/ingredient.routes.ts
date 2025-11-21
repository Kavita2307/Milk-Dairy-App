import { Router } from "express";
import {
  addIngredient,
  getIngredients,
} from "../controllers/ingredient.controller";

const router = Router();

router.post("/", addIngredient);
router.get("/", getIngredients);

export default router;
