import { Request, Response } from "express";
import prisma from "../prisma/client";

/* Save mix load and update ingredient stock */
export const saveMixLoad = async (req: Request, res: Response) => {
  const {
    ingredientId,
    userId,
    quantity, // load cell kg
    note,
  } = req.body;

  // Save consumption
  const consumption = await prisma.consumption.create({
    data: {
      ingredientId,
      quantity,
      note,
      userId,
    },
  });

  // Reduce stock
  await prisma.ingredient.update({
    where: { id: ingredientId },
    data: {
      currentStock: { decrement: quantity },
    },
  });

  res.json(consumption);
};
export const finalMixSummary = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  const consumptions = await prisma.consumption.findMany({
    include: { ingredient: true },
  });

  let allocated = 0;
  let loaded = 0;

  const items = consumptions.map((c) => {
    const allocatedKg = c.quantity; // planned
    const loadKg = c.quantity;

    allocated += allocatedKg;
    loaded += loadKg;

    return {
      ingredientId: c.ingredientId,
      name: c.ingredient.name,
      allocatedKg,
      loadKg,
      balanceKg: allocatedKg - loadKg,
    };
  });

  const accuracy =
    allocated === 0 ? 100 : Math.round((loaded / allocated) * 100);

  res.json({
    summary: {
      allocated,
      loaded,
      balance: allocated - loaded,
      accuracy,
    },
    items,
  });
};
export const mixSummary = async (req: Request, res: Response) => {
  const consumptions = await prisma.consumption.findMany({
    include: { ingredient: true },
  });

  const summary = consumptions.map((c) => ({
    ingredient: c.ingredient.name,
    usedKg: c.quantity,
  }));

  res.json(summary);
};
