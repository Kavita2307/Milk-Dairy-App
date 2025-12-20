import { Router } from "express";
import { dailyFeedEfficiency } from "../controllers/report.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/daily-feed-efficiency", requireAuth, dailyFeedEfficiency);

export default router;
