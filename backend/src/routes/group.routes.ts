import { Router } from "express";
import { getGroups, createGroup } from "../controllers/group.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, getGroups);
router.post("/", requireAuth, createGroup);

export default router;
