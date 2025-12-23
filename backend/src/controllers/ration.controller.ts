import { Request, Response } from "express";
import prisma from "../prisma/client";

/* Fetch complete ration + ingredients for a group */
export const getRationByGroup = async (req: Request, res: Response) => {
  const groupId = Number(req.params.groupId);
  const ration = await prisma.ration.findFirst({
    where: { groupId },
  });

  const ingredients = await prisma.ingredient.findMany({
    orderBy: { id: "asc" },
  });

  res.json({ ration, ingredients });
};

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
