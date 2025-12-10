import { Request, Response } from "express";
import prisma from "../prisma/client";

// Save milk
export const saveMilk = async (req: Request, res: Response) => {
  try {
    const { groupId, milkLit, shift, animalNumber } = req.body;

    if (!groupId || !milkLit || !shift || !animalNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    console.log("Milk backend: ", req.body);
    const entry = await prisma.milk.create({
      data: {
        groupId: Number(groupId),
        milkLit: Number(milkLit),
        shift,
        animalNumber: animalNumber.toString(),
      },
    });

    console.log("Saved entry:", entry);

    return res.json({ message: "Saved", entry });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// Load cell mock
export const readMilkLoadCell = async (_req: Request, res: Response) => {
  const random = Math.floor(Math.random() * 40); // 0–40 litres
  return res.json({ weight: random });
};
