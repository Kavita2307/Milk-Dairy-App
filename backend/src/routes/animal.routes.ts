import { Router } from "express";
import { addAnimal, getAnimals } from "../controllers/animal.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/", addAnimal);
router.get("/", getAnimals);
router.post("/", requireAuth, addAnimal);

export default router;
