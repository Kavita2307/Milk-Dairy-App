import { Request, Response } from "express";
import prisma from "../prisma/client";

export const addRation = async (req: Request, res: Response) => {
  try {
    const ration = await prisma.ration.create({ data: req.body });
    res.json(ration);
  } catch (err) {
    res.status(500).json({ error: "Failed to add ration" });
  }
};

export const getRationByGroup = async (req: Request, res: Response) => {
  try {
    const groupId = Number(req.params.groupId);
    const ration = await prisma.ration.findMany({ where: { groupId } });
    res.json(ration);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ration data" });
  }
};
