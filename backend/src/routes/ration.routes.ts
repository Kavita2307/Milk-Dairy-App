import { Router } from "express";
import { addRation, getRationByGroup } from "../controllers/ration.controller";

const router = Router();

router.post("/", addRation);
router.get("/:groupId", getRationByGroup);

export default router;
