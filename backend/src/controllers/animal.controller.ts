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
    const { animalNumber, groupId, userId } = req.body;
    console.log("animal: ", req.body);
    const animal = await prisma.animal.create({
      data: req.body,
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
export const getAnimalDetails = async (
  req: Request & { user?: any },
  res: Response
) => {
  const { animalNumber } = req.params;

  const animal = await prisma.animal.findFirst({
    where: { animalNumber: req.params.animalNumber },
  });

  if (!animal) {
    return res.status(404).json({ error: "Animal not found" });
  }

  return res.json(animal);
};

export const updateAnimalDetails = async (req: Request, res: Response) => {
  const { animalNumber, groupId, userId, details } = req.body;

  const animal = await prisma.animal.findFirst({
    where: { animalNumber: req.params.animalNumber },
  });

  if (!animal) {
    return res.status(404).json({ error: "Animal not found" });
  }

  const updated = await prisma.animal.update({
    where: { id: animal.id },
    data: {
      details: {
        ...((animal.details as Record<string, any>) || {}),
        ...(details as Record<string, any>),
      },
    },
  });

  res.json(updated);
};
