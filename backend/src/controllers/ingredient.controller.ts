// import { Request, Response } from "express";
// import prisma from "../prisma/client";

// export const listIngredients = async (_req: Request, res: Response) => {
//   const ingredients = await prisma.ingredient.findMany({
//     orderBy: { name: "asc" },
//     select: { id: true, name: true, currentStock: true },
//   });
//   res.json(ingredients);
// };

// export const createIngredient = async (req: any, res: Response) => {
//   try {
//     const { name, details, initialStock } = req.body;
//     const userId = req.user.id; //  FROM AUTH

//     const ing = await prisma.ingredient.create({
//       data: {
//         name,
//         details: details ?? null,
//         currentStock: initialStock,

//         user: {
//           connect: { id: userId },
//         },
//       },
//     });

//     if (initialStock > 0) {
//       await prisma.stockEntry.create({
//         data: {
//           ingredientId: ing.id,
//           quantity: initialStock,
//           note: "Initial stock",
//         },
//       });
//     }

//     res.status(201).json(ing);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to create ingredient" });
//   }
// };

// export const getIngredient = async (_req: Request, res: Response) => {
//   const id = Number(_req.params.id);
//   const ing = await prisma.ingredient.findUnique({
//     where: { id },
//     include: {
//       stockEntries: { orderBy: { createdAt: "desc" } },
//       consumptions: { orderBy: { createdAt: "desc" } },
//     },
//   });
//   if (!ing) return res.status(404).json({ error: "Not found" });
//   res.json(ing);
// };

// export const addStock = async (_req: Request, res: Response) => {
//   const id = Number(_req.params.id);
//   const { quantity, note } = _req.body;
//   if (!quantity || quantity <= 0)
//     return res.status(400).json({ error: "Invalid quantity" });

//   const updated = await prisma
//     .$transaction([
//       prisma.stockEntry.create({
//         data: { ingredientId: id, quantity, note },
//       }),
//       prisma.ingredient.update({
//         where: { id },
//         data: { currentStock: { increment: quantity } }, // Prisma numeric increment helper for float depends on Prisma; otherwise read-merge-write
//       }),
//     ])
//     .then((results) => results[1]);

//   res.json(updated);
// };

// export const recordConsumption = async (_req: Request, res: Response) => {
//   const id = Number(_req.params.id);
//   const { quantity, note } = _req.body;
//   if (!quantity || quantity <= 0)
//     return res.status(400).json({ error: "Invalid quantity" });

//   // Prevent negative stock
//   const ingredient = await prisma.ingredient.findUnique({ where: { id } });
//   if (!ingredient) return res.status(404).json({ error: "Not found" });
//   const newStock = ingredient.currentStock - quantity;
//   if (newStock < 0)
//     return res.status(400).json({ error: "Insufficient stock" });

//   const updated = await prisma
//     .$transaction([
//       prisma.consumption.create({ data: { ingredientId: id, quantity, note } }),
//       prisma.ingredient.update({
//         where: { id },
//         data: { currentStock: newStock },
//       }),
//     ])
//     .then((r) => r[1]);

//   res.json(updated);
// };
// src/controllers/ingredient.controller.ts
import { Request, Response } from "express";
import prisma from "../prisma/client";

/**
 * CREATE INGREDIENT
 */
export const createIngredient = async (req: Request, res: Response) => {
  try {
    const { name, price, dryMatter, currentStock, userId } = req.body;

    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        details: {
          price,
          dryMatter,
        },
        currentStock,
        userId,
      },
    });

    res.status(201).json(ingredient);
  } catch (err) {
    res.status(400).json({ message: "Ingredient already exists" });
  }
};

/**
 * GET INGREDIENTS (Alphabetical Order)
 */
export const getIngredients = async (_req: Request, res: Response) => {
  const ingredients = await prisma.ingredient.findMany({
    orderBy: { name: "asc" },
  });

  res.json(ingredients);
};

/**
 * ADD STOCK
 */
export const addStock = async (req: Request, res: Response) => {
  const { ingredientId, quantity, note } = req.body;
  console.log("Add stock request:", { ingredientId, quantity, note });
  await prisma.$transaction([
    prisma.stockEntry.create({
      data: { ingredientId, quantity, note },
    }),
    prisma.ingredient.update({
      where: { id: ingredientId },
      data: { currentStock: { increment: quantity } },
    }),
  ]);

  res.json({ message: "Stock added successfully" });
};

// export const getIngredientById = async (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   const ingredient = await prisma.ingredient.findUnique({
//     where: { id },
//   });
//   if (!ingredient) return res.status(404).json({ error: "Not found" });

//   res.json(ingredient);
// };

export const getIngredientById = async (req: Request, res: Response) => {
  const ingredientId = Number(req.params.id);

  const ingredient = await prisma.ingredient.findUnique({
    where: { id: ingredientId },
    include: {
      stockEntries: true,
      consumptions: true,
    },
  });

  if (!ingredient) {
    return res.status(404).json({ message: "Ingredient not found" });
  }

  // Calculate daily consumption (example: today)
  const dailyConsumption = ingredient.consumptions.reduce(
    (sum, c) => sum + c.quantity,
    0
  );

  const daysLeft =
    dailyConsumption > 0 ? ingredient.currentStock / dailyConsumption : null;

  const details = ingredient.details as {
    price?: number;
    dryMatter?: number;
  } | null;

  res.json({
    id: ingredient.id,
    name: ingredient.name,
    price: details?.price,
    dryMatter: details?.dryMatter,
    currentStock: ingredient.currentStock,
    dailyConsumption,
    daysLeft,
  });
};

export const updateIngredient = async (req: Request, res: Response) => {
  try {
    const ingredientId = Number(req.params.id);
    const { name, price, dryMatter } = req.body;

    const ingredient = await prisma.ingredient.update({
      where: { id: ingredientId },
      data: {
        name,
        details: {
          price,
          dryMatter,
        },
      },
    });

    res.json(ingredient);
  } catch (error) {
    res.status(400).json({ message: "Ingredient update failed" });
  }
};
