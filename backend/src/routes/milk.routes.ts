import { Router } from "express";
import { saveMilk, readMilkLoadCell } from "../controllers/milk.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/", requireAuth, saveMilk);
router.get("/loadcell/read", requireAuth, readMilkLoadCell);

export default router;
