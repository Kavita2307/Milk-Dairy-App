import { Request, Response } from "express";
import prisma from "../prisma/client";

/* Fetch complete ration + ingredients for a group */
// export const getRationByGroup = async (req: Request, res: Response) => {
//   const groupId = Number(req.params.groupId);
//   const ration = await prisma.ration.findFirst({
//     where: { groupId },
//   });

//   const ingredients = await prisma.ingredient.findMany({
//     orderBy: { id: "asc" },
//   });

//   res.json({ ration, ingredients });
// };

// /* Update ration main info */
// export const updateRation = async (req: Request, res: Response) => {
//   const { groupId, userId, data } = req.body;

//   const ration = await prisma.ration.upsert({
//     where: { groupId },
//     update: { ...data },
//     create: { groupId, userId, ...data },
//   });

//   res.json(ration);
// };

// /* Add ingredient row */
// export const addIngredient = async (req: Request, res: Response) => {
//   const { groupId, name, kg, total } = req.body;

//   const ingredient = await prisma.ingredient.create({
//     data: { name, kg, total },
//   });

//   res.json(ingredient);
// };

// /* Get ingredients only */
// export const getIngredients = async (req: Request, res: Response) => {
//   const groupId = req.params.groupId;

//   const ingredients = await prisma.ingredient.findMany({
//     where: { groupId },
//   });

//   res.json(ingredients);
// };

export const createRation = async (req: Request, res: Response) => {
  const { userId, groupId, name, no, kg, rationSize, days } = req.body;

  const total = no * kg;

  const ration = await prisma.ration.create({
    data: {
      userId,
      groupId,
      name,
      no,
      kg,
      total,
      rationSize,
      days,
      thisLoad: 0,
      lastLoad: 0,
      diff: 0,
    },
  });

  res.json(ration);
};

export const listIngredients = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const ingredients = await prisma.ingredient.findMany({
    where: { userId: Number(userId) },
  });

  res.json(ingredients);
};
export const upsertRation = async (req: Request, res: Response) => {
  const { userId, groupId, name, no, kg, rationSize, days } = req.body;

  const total = Number(no) * Number(kg);

  const ration = await prisma.ration.upsert({
    where: {
      id: undefined, // Replace with the actual unique field or composite key from your schema
    },
    update: {
      name,
      no,
      kg,
      total,
      rationSize,
      days,
    },
    create: {
      userId,
      groupId,
      name,
      no,
      kg,
      total,
      rationSize,
      days,
      thisLoad: 0,
      lastLoad: 0,
      diff: 0,
    },
  });

  res.json(ration);
};

/**
 * GET /ration/history/:groupId
 */
export const getRationHistory = async (req: Request, res: Response) => {
  try {
    const groupId = Number(req.params.groupId);
    const userId = Number(req.query.userId);

    const history = await prisma.ration.findMany({
      where: { groupId, userId },
      orderBy: { createdAt: "desc" },
      take: 7,
      select: {
        total: true,
        createdAt: true,
      },
    });

    res.json({ history });
  } catch (error) {
    console.error("ration history error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
/**
 * GET RATION + INGREDIENTS
 */
export const getRationByGroup = async (req: Request, res: Response) => {
  const groupId = Number(req.params.groupId);

  const ration = await prisma.ration.findFirst({
    where: { groupId },
  });

  const ingredients = await prisma.consumption.findMany({
    where: { ingredient: { userId: ration?.userId } },
    include: {
      ingredient: true,
    },
  });

  const mapped = ingredients.map((c) => ({
    consumptionId: c.id,
    ingredientId: c.ingredientId,
    name: c.ingredient.name,
    quantity: c.quantity,
    dm: (c.ingredient.details as any)?.dm ?? 0,
  }));

  res.json({
    ration,
    ingredients: mapped,
  });
};

/**
 * UPDATE INGREDIENT (PER ANIMAL KG)
 */
export const updateRationIngredient = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { kg } = req.body;

  if (!id || isNaN(kg)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const updated = await prisma.consumption.update({
    where: { id },
    data: { quantity: Number(kg) },
  });

  res.json({ message: "Updated", data: updated });
};

/**
 * DELETE INGREDIENT FROM RATION
 */
export const deleteRationIngredient = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await prisma.consumption.delete({ where: { id } });

  res.json({ message: "Deleted" });
};
