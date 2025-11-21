import { Request, Response } from "express";
import prisma from "../prisma/client";

export const addLeftover = async (req: Request, res: Response) => {
  try {
    const leftover = await prisma.leftover.create({ data: req.body });
    res.json(leftover);
  } catch (err) {
    res.status(500).json({ error: "Failed to add leftover" });
  }
};

export const getLeftoverByGroup = async (req: Request, res: Response) => {
  try {
    const groupId = Number(req.params.groupId);
    const leftover = await prisma.leftover.findMany({ where: { groupId } });
    res.json(leftover);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leftover data" });
  }
};
