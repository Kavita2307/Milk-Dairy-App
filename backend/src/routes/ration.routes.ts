import { Router } from "express";
import {
  getRationByGroup,
  updateRation,
  addIngredient,
  getIngredients,
} from "../controllers/ration.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/:groupId", requireAuth, getRationByGroup);
router.put("/update", requireAuth, updateRation);

router.post("/ingredient/add", requireAuth, addIngredient);
router.get("/ingredient/:groupId", requireAuth, getIngredients);

export default router;
