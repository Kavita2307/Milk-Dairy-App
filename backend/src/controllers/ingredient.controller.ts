import { Request, Response } from "express";
import prisma from "../prisma/client";

export const listIngredients = async (_req: Request, res: Response) => {
  const ingredients = await prisma.ingredient.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, currentStock: true },
  });
  res.json(ingredients);
};

export const createIngredient = async (_req: Request, res: Response) => {
  const { name, initialStock = 0 } = _req.body;
  console.log("create ingredient: ", _req.body);
  const ing = await prisma.ingredient.create({
    data: {
      name,
      currentStock: initialStock,
    },
  });
  if (initialStock > 0) {
    await prisma.stockEntry.create({
      data: {
        ingredientId: ing.id,
        quantity: initialStock,
        note: "Initial stock",
      },
    });
  }
  res.status(201).json(ing);
};

export const getIngredient = async (_req: Request, res: Response) => {
  const id = Number(_req.params.id);
  const ing = await prisma.ingredient.findUnique({
    where: { id },
    include: {
      stockEntries: { orderBy: { createdAt: "desc" } },
      consumptions: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!ing) return res.status(404).json({ error: "Not found" });
  res.json(ing);
};

export const addStock = async (_req: Request, res: Response) => {
  const id = Number(_req.params.id);
  const { quantity, note } = _req.body;
  if (!quantity || quantity <= 0)
    return res.status(400).json({ error: "Invalid quantity" });

  const updated = await prisma
    .$transaction([
      prisma.stockEntry.create({
        data: { ingredientId: id, quantity, note },
      }),
      prisma.ingredient.update({
        where: { id },
        data: { currentStock: { increment: quantity } }, // Prisma numeric increment helper for float depends on Prisma; otherwise read-merge-write
      }),
    ])
    .then((results) => results[1]);

  res.json(updated);
};

export const recordConsumption = async (_req: Request, res: Response) => {
  const id = Number(_req.params.id);
  const { quantity, note } = _req.body;
  if (!quantity || quantity <= 0)
    return res.status(400).json({ error: "Invalid quantity" });

  // Prevent negative stock
  const ingredient = await prisma.ingredient.findUnique({ where: { id } });
  if (!ingredient) return res.status(404).json({ error: "Not found" });
  const newStock = ingredient.currentStock - quantity;
  if (newStock < 0)
    return res.status(400).json({ error: "Insufficient stock" });

  const updated = await prisma
    .$transaction([
      prisma.consumption.create({ data: { ingredientId: id, quantity, note } }),
      prisma.ingredient.update({
        where: { id },
        data: { currentStock: newStock },
      }),
    ])
    .then((r) => r[1]);

  res.json(updated);
};
