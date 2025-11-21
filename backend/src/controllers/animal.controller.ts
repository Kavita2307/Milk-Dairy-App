import { Request, Response } from "express";
import prisma from "../prisma/client";

export const addAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await prisma.animal.create({ data: req.body });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: "Failed to add animal" });
  }
};

export const getAnimals = async (_req: Request, res: Response) => {
  try {
    const animals = await prisma.animal.findMany({
      include: { group: true },
    });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch animals" });
  }
};
