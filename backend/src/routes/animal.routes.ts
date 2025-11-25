// import { Router } from "express";
// import { addAnimal, getAnimals } from "../controllers/animal.controller";
// import { requireAuth } from "../middleware/auth";

// const router = Router();

// router.post("/", addAnimal);
// router.get("/", getAnimals);
// router.post("/", requireAuth, addAnimal);

// export default router;
import { Router } from "express";
import {
  addAnimal,
  getAnimals,
  updateAnimalAge,
} from "../controllers/animal.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/", requireAuth, addAnimal);
router.get("/", requireAuth, getAnimals);
router.put("/update-age", requireAuth, updateAnimalAge);

export default router;
