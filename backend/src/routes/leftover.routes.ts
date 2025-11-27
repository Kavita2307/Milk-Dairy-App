import { Router } from "express";
import {
  saveLeftover,
  getLeftoverHistory,
  readLoadCell,
} from "../controllers/leftover.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Read from load cell
router.get("/loadcell/read", requireAuth, readLoadCell);

// Save leftover
router.post("/", requireAuth, saveLeftover);

// List leftover history for a group
router.get("/:groupId", requireAuth, getLeftoverHistory);

export default router;
