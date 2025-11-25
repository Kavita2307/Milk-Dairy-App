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

export const updateAnimalAge = async (
  req: Request & { user?: any },
  res: Response
) => {
  const { animalNumber, groupId, userId, age } = req.body;

  try {
    // 1. Find the existing animal record
    const animal = await prisma.animal.findFirst({
      where: { animalNumber, groupId, userId },
    });

    if (!animal) {
      return res.status(404).json({ error: "Animal not found" });
    }

    // 2. Merge new age into existing JSON details
    const updatedDetails = {
      ...(typeof animal.details === "object" && animal.details !== null
        ? animal.details
        : {}),
      age: age,
    };

    // 3. Update in DB
    const updatedAnimal = await prisma.animal.update({
      where: { id: animal.id },
      data: { details: updatedDetails },
    });

    return res.json({
      message: "Animal age updated successfully",
      data: updatedAnimal,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to update animal age" });
  }
};
