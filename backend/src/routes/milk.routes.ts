import { Router } from "express";
import { addMilkEntry, getMilkByGroup } from "../controllers/milk.controller";

const router = Router();

router.post("/", addMilkEntry);
router.get("/:groupId", getMilkByGroup);

export default router;
