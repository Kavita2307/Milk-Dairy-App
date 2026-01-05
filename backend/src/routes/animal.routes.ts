import { Router } from "express";
import {
  addAnimal,
  getAnimals,
  getAnimalDetails,
  updateAnimalDetails,
} from "../controllers/animal.controller";
import { requireAuth } from "../middleware/auth";
import { getAnimalCountByGroup } from "../controllers/admin.controller";

const router = Router();

router.post("/", requireAuth, addAnimal);
router.get("/", requireAuth, getAnimals);
router.get("/:animalNumber", requireAuth, getAnimalDetails);
router.put("/update-details", requireAuth, updateAnimalDetails);
router.get("/count/:groupId", requireAuth, getAnimalCountByGroup);

export default router;
