// import { Router } from "express";
// import { createGroup, getGroups } from "../controllers/group.controller";

// const router = Router();

// router.post("/", createGroup);
// router.get("/", getGroups);

// export default router;
import { Router } from "express";
import { getGroups, createGroup } from "../controllers/group.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, getGroups);
router.post("/", requireAuth, createGroup);

export default router;
