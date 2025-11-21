import { Request, Response } from "express";
import prisma from "../prisma/client";

export const addMilkEntry = async (req: Request, res: Response) => {
  try {
    const milk = await prisma.milk.create({ data: req.body });
    res.json(milk);
  } catch (err) {
    res.status(500).json({ error: "Failed to add milk entry" });
  }
};

export const getMilkByGroup = async (req: Request, res: Response) => {
  try {
    const groupId = Number(req.params.groupId);
    const milk = await prisma.milk.findMany({ where: { groupId } });
    res.json(milk);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch milk data" });
  }
};
