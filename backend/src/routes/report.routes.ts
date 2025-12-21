import { Router } from "express";
import {
  cowWiseMilkReport,
  dailyAverageDmiReport,
  dailyFeedEfficiencyReport,
  getCowNumbers,
  groupWiseDailyMilkAvgReport,
} from "../controllers/report.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/daily-feed-efficiency", requireAuth, dailyFeedEfficiencyReport);

router.get("/daily-average-dmi", requireAuth, dailyAverageDmiReport);

router.get("/cow-wise-milk", requireAuth, cowWiseMilkReport);

router.get("/cow-numbers", requireAuth, getCowNumbers);

router.get(
  "/group-wise-daily-milk-avg",
  requireAuth,
  groupWiseDailyMilkAvgReport
);

export default router;
