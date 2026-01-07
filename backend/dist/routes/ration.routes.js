"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ration_controller_1 = require("../controllers/ration.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// router.get("/:groupId", requireAuth, getRationByGroup);
// router.post("/", requireAuth, createRation);
// router.get("/history/:groupId", requireAuth, getRationHistory);
// router.get("/ingredients/:userId", requireAuth, listIngredients);
// router.post("/", requireAuth, upsertRation);
// router.put("/ingredient/:id", requireAuth, updateRationIngredient);
// router.delete("/ingredient/:id", requireAuth, deleteRationIngredient);
router.post("/plan", auth_1.requireAuth, ration_controller_1.createRationPlan);
//router.post("/group", requireAuth, saveRationGroup);
router.post("/ingredient", auth_1.requireAuth, ration_controller_1.addRationIngredient);
router.get("/group/:groupId/ingredients", auth_1.requireAuth, ration_controller_1.getGroupIngredients);
router.post("/mix-log", auth_1.requireAuth, ration_controller_1.saveMixLog);
router.post("/group/:id/feed", auth_1.requireAuth, ration_controller_1.feedTmr);
//router.get("/group/:groupId/mix-accuracy", requireAuth, getMixAccuracy);
router.get("/group/:rationGroupId/mix-accuracy", auth_1.requireAuth, ration_controller_1.getMixAccuracy);
router.post("/group", auth_1.requireAuth, ration_controller_1.createRationGroup);
router.put("/group/:id", auth_1.requireAuth, ration_controller_1.updateRationGroup);
router.get("/group/:id", auth_1.requireAuth, ration_controller_1.getRationGroupById);
router.get("/group/:rationGroupId/ingredients", auth_1.requireAuth, ration_controller_1.getIngredientsByGroup);
router.put("/ingredient/:id", auth_1.requireAuth, ration_controller_1.updateRationIngredient);
/**
 * MIX ACCURACY SCREEN
 */
router.get("/group/:rationGroupId/mix-accuracy", auth_1.requireAuth, ration_controller_1.getMixAccuracyByGroup);
exports.default = router;
