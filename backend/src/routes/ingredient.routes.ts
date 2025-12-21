// import { Router } from "express";
// import {
//   addStock,
//   createIngredient,
//   getIngredient,
//   listIngredients,
//   recordConsumption,
// } from "../controllers/ingredient.controller";
// import { requireAuth } from "../middleware/auth";

// const router = Router();

// router.get("/", requireAuth, listIngredients); // GET /ingredients
// router.post("/", requireAuth, createIngredient); // POST /ingredients
// router.get("/:id", requireAuth, getIngredient); // GET /ingredients/:id
// router.post("/:id/add-stock", requireAuth, addStock); // POST /ingredients/:id/add-stock
// router.post("/:id/consume", requireAuth, recordConsumption); // POST /ingredients/:id/consume

// export default router;
// src/routes/ingredient.routes.ts
import { Router } from "express";
import {
  createIngredient,
  getIngredients,
  getIngredientById,
  updateIngredient,
  addStock,
} from "../controllers/ingredient.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/", requireAuth, createIngredient);
router.get("/", requireAuth, getIngredients);
router.get("/:id", requireAuth, getIngredientById);
router.put("/:id", requireAuth, updateIngredient);

//router.post("/add-stock", addStock);
router.post("/:ingredientId/add-stock", requireAuth, addStock);
export default router;
