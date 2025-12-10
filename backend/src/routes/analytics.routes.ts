import { Router } from "express";
import {
  herdSummary,
  milkLast7Days,
  leftoverByGroup,
} from "../controllers/analytics.controller";

const router = Router();

router.get("/herd-summary", herdSummary);
router.get("/milk/group/:groupId/last7", milkLast7Days);
router.get("/leftover/by-group", leftoverByGroup);

export default router;
