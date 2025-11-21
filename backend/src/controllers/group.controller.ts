import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createGroup = async (req: Request, res: Response) => {
  try {
    const group = await prisma.group.create({ data: req.body });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: "Failed to create group" });
  }
};

export const getGroups = async (_req: Request, res: Response) => {
  try {
    const groups = await prisma.group.findMany();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch groups" });
  }
};
