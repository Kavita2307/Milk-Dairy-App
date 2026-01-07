import { Router } from "express";
import {
  createRationPlan,
  saveRationGroup,
  addRationIngredient,
  getGroupIngredients,
  saveMixLog,
  feedTmr,
  getMixAccuracy,
  getRationGroupById,
  updateRationGroup,
  createRationGroup,
  updateRationIngredient,
  getIngredientsByGroup,
  getMixAccuracyByGroup,
} from "../controllers/ration.controller";
import { requireAuth } from "../middleware/auth";
import { get } from "http";

const router = Router();

// router.get("/:groupId", requireAuth, getRationByGroup);

// router.post("/", requireAuth, createRation);
// router.get("/history/:groupId", requireAuth, getRationHistory);
// router.get("/ingredients/:userId", requireAuth, listIngredients);
// router.post("/", requireAuth, upsertRation);
// router.put("/ingredient/:id", requireAuth, updateRationIngredient);
// router.delete("/ingredient/:id", requireAuth, deleteRationIngredient);

router.post("/plan", requireAuth, createRationPlan);
//router.post("/group", requireAuth, saveRationGroup);
router.post("/ingredient", requireAuth, addRationIngredient);
router.get("/group/:groupId/ingredients", requireAuth, getGroupIngredients);
router.post("/mix-log", requireAuth, saveMixLog);

router.post("/group/:id/feed", requireAuth, feedTmr);
//router.get("/group/:groupId/mix-accuracy", requireAuth, getMixAccuracy);
router.get("/group/:rationGroupId/mix-accuracy", requireAuth, getMixAccuracy);

router.post("/group", requireAuth, createRationGroup);
router.put("/group/:id", requireAuth, updateRationGroup);
router.get("/group/:id", requireAuth, getRationGroupById);
router.get(
  "/group/:rationGroupId/ingredients",
  requireAuth,
  getIngredientsByGroup
);
router.put("/ingredient/:id", requireAuth, updateRationIngredient);

/**
 * MIX ACCURACY SCREEN
 */
router.get(
  "/group/:rationGroupId/mix-accuracy",
  requireAuth,
  getMixAccuracyByGroup
);

export default router;
