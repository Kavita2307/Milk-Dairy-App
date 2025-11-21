import { Router } from "express";
import {
  addLeftover,
  getLeftoverByGroup,
} from "../controllers/leftover.controller";

const router = Router();

router.post("/", addLeftover);
router.get("/:groupId", getLeftoverByGroup);

export default router;
