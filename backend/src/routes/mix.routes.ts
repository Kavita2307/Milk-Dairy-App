import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import {
  finalMixSummary,
  mixSummary,
  saveMixLoad,
} from "../controllers/mix.controller";

const router = Router();

router.post("/", requireAuth, saveMixLoad);
router.get("/mix-summary/:groupId", requireAuth, finalMixSummary);
router.get("/summary", requireAuth, mixSummary);

export default router;
