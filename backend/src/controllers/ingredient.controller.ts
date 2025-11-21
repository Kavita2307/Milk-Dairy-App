import { Request, Response } from "express";
import prisma from "../prisma/client";

export const addIngredient = async (req: Request, res: Response) => {
  try {
    const ing = await prisma.ingredient.create({ data: req.body });
    res.json(ing);
  } catch (err) {
    res.status(500).json({ error: "Failed to add ingredient" });
  }
};

export const getIngredients = async (_req: Request, res: Response) => {
  try {
    const data = await prisma.ingredient.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ingredients" });
  }
};
