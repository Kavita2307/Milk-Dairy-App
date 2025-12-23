import { Request, Response } from "express";
import prisma from "../prisma/client";

// 📌 Save leftover entry
export const saveLeftover = async (req: Request, res: Response) => {
  try {
    const { groupId, leftoverKg, userId } = req.body;

    if (!groupId || leftoverKg === undefined) {
      return res.status(400).json({ error: "Missing groupId or leftoverKg" });
    }

    const entry = await prisma.leftover.create({
      data: {
        groupId: Number(groupId),
        leftoverKg: Number(leftoverKg),
        userId: Number(userId),
      },
    });

    return res.json({ message: "Saved successfully", entry });
  } catch (err) {
    console.error("Save leftover error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

//  Get leftover history for a group
export const getLeftoverHistory = async (req: Request, res: Response) => {
  try {
    const groupId = Number(req.params.groupId);

    const entries = await prisma.leftover.findMany({
      where: { groupId },
      orderBy: { date: "desc" },
    });

    return res.json(entries);
  } catch (err) {
    console.error("Get leftover error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// 📌 Load Cell Reading (Simulated)
export const readLoadCell = async (_req: Request, res: Response) => {
  try {
    // Here you can integrate actual hardware
    const randomWeight = Math.floor(Math.random() * 200); // Fake load cell

    return res.json({ weight: randomWeight });
  } catch (err) {
    console.error("Load cell read error:", err);
    return res.status(500).json({ error: "Cannot read load cell" });
  }
};
