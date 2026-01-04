import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import {
  getAdminRation,
  getFarmerById,
  getFarmers,
  updateFarmerStatus,
  upsertAdminRation,
} from "../controllers/admin.controller";

const router = Router();
router.get("/farmers", requireAuth, getFarmers);
router.post("/farmer/approve", requireAuth, updateFarmerStatus);
router.get("/farmer/:id", requireAuth, getFarmerById);
router.post("/ration", requireAuth, upsertAdminRation);
router.get("/ration/:groupId", requireAuth, getAdminRation);

export default router;
