import { Router } from "express";
import {
  createRation,
  deleteRationIngredient,
  getRationByGroup,
  getRationHistory,
  listIngredients,
  updateRationIngredient,
  upsertRation,
  //   updateRation,
  //   addIngredient,
  //   getIngredients,
} from "../controllers/ration.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/:groupId", requireAuth, getRationByGroup);
// router.put("/update", requireAuth, updateRation);

// router.post("/ingredient/add", requireAuth, addIngredient);
// router.get("/ingredient/:groupId", requireAuth, getIngredients);
router.post("/", requireAuth, createRation);
router.get("/history/:groupId", requireAuth, getRationHistory);
router.get("/ingredients/:userId", requireAuth, listIngredients);
router.post("/", requireAuth, upsertRation);
router.put("/ingredient/:id", requireAuth, updateRationIngredient);
router.delete("/ingredient/:id", requireAuth, deleteRationIngredient);

export default router;
