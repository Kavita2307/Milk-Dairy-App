import { Request, Response } from "express";
import prisma from "../prisma/client";

export const addAnimal = async (req: Request, res: Response) => {
  try {
    const { animalNumber, groupId, userId } = req.body;
    console.log("animal: ", req.body);
    if (!animalNumber || !groupId || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const animal = await prisma.animal.create({
      data: {
        animalNumber,
        groupId: Number(groupId),
        userId: Number(userId),
      },
    });

    return res.json(animal);
  } catch (error) {
    console.error("Add animal error:", error);
    return res.status(500).json({ error: "Server error" });
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

// export const updateAnimalDetails = async (req: Request, res: Response) => {
//   const { animalNumber, groupId, userId, details } = req.body;

//   const animal = await prisma.animal.findFirst({
//     where: { animalNumber: req.params.animalNumber },
//   });

//   if (!animal) {
//     return res.status(404).json({ error: "Animal not found" });
//   }

//   const updated = await prisma.animal.update({
//     where: { id: animal.id },
//     data: {
//       details: {
//         ...((animal.details as Record<string, any>) || {}),
//         ...(details as Record<string, any>),
//       },
//     },
//   });

//   res.json(updated);
// };
export const updateAnimalDetails = async (req: Request, res: Response) => {
  const { animalNumber, details } = req.body;

  const animal = await prisma.animal.findFirst({
    where: { animalNumber },
  });

  if (!animal) {
    return res.status(404).json({ error: "Animal not found" });
  }

  const mergedDetails = {
    ...(typeof animal.details === "object" && animal.details !== null
      ? animal.details
      : {}),
    ...details,
  };

  const updated = await prisma.animal.update({
    where: { id: animal.id },
    data: { details: mergedDetails },
  });

  res.json(updated);
};
