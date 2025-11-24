// import { Request, Response } from "express";
// import prisma from "../prisma/client";

// export const addAnimal = async (req: Request, res: Response) => {
//   try {
//     const animal = await prisma.animal.create({ data: req.body });
//     res.json(animal);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to add animal" });
//   }
// };

// export const getAnimals = async (_req: Request, res: Response) => {
//   try {
//     const animals = await prisma.animal.findMany({
//       include: { group: true },
//     });
//     res.json(animals);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch animals" });
//   }
// };
import { Request, Response } from "express";
import prisma from "../prisma/client";

export const addAnimal = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    const { animalNumber, groupId } = req.body;

    const animal = await prisma.animal.create({
      data: {
        animalNumber,
        groupId: Number(groupId),
        userId: req.user.userId,
      },
    });

    res.json(animal);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add animal" });
  }
};

export const getAnimals = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    const animals = await prisma.animal.findMany({
      where: { userId: req.user.userId },
      include: { group: true },
    });

    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: "Error fetching animals" });
  }
};
