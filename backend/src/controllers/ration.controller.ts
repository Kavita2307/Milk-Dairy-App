import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createRationPlan = async (req: Request, res: Response) => {
  try {
    const { date, createdBy } = req.body;

    const plan = await prisma.rationPlan.upsert({
      where: { date_createdBy: { date: new Date(date), createdBy } },
      update: {},
      create: {
        date: new Date(date),
        createdBy,
      },
    });

    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: "Failed to create ration plan" });
  }
};
export const saveRationGroup = async (req: Request, res: Response) => {
  try {
    const {
      rationPlanId,
      groupId,
      animalCount,
      rationPercentage,
      plannedTmrQty,
      userId,
    } = req.body;

    const offeredTmrQty = plannedTmrQty * (rationPercentage / 100);

    const group = await prisma.rationGroup.upsert({
      where: {
        rationPlanId_groupId_userId: {
          rationPlanId,
          groupId,
          userId,
        },
      },
      update: {
        animalCount,
        rationPercentage,
        plannedTmrQty,
        offeredTmrQty,
      },
      create: {
        rationPlanId,
        groupId,
        userId,
        animalCount,
        rationPercentage,
        plannedTmrQty,
        offeredTmrQty,
      },
    });

    res.json(group);
  } catch (error) {
    res.status(500).json({ error: "Failed to save ration group" });
  }
};
// export const addRationIngredient = async (req: Request, res: Response) => {
//   try {
//     const {
//       rationGroupId,
//       ingredientId,
//       qtyPerAnimal,
//       animalCount,
//       dmPercent,
//       mixTimeMinutes,
//       userId,
//       groupId,
//     } = req.body;

//     const totalQty = qtyPerAnimal * animalCount;
//     const dmKg = totalQty * (dmPercent / 100);

//     const ingredient = await prisma.rationIngredient.create({
//       data: {
//         rationGroupId,
//         ingredientId,
//         userId,
//         groupId,
//         qtyPerAnimal,
//         totalQty,
//         dmPercent,
//         dmKg,
//         mixTimeMinutes,
//       },
//     });

//     res.json(ingredient);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add ingredient" });
//   }
// };
export const getGroupIngredients = async (req: Request, res: Response) => {
  try {
    const groupId = Number(req.params.groupId);

    const ingredients = await prisma.rationIngredient.findMany({
      where: { rationGroupId: groupId },
      include: {
        ingredient: true,
      },
      orderBy: { id: "asc" },
    });

    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ingredients" });
  }
};
// export const saveMixLog = async (req: Request, res: Response) => {
//   try {
//     const { rationIngredientId, plannedQty, actualQty, userId, groupId } =
//       req.body;

//     const accuracyPercent = (actualQty / plannedQty) * 100;

//     const log = await prisma.rationMixLog.create({
//       data: {
//         rationIngredientId,
//         userId,
//         groupId,
//         plannedQty,
//         actualQty,
//         accuracyPercent,
//       },
//     });

//     res.json(log);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to save mix log" });
//   }
// };
// export const feedTmr = async (req: Request, res: Response) => {
//   try {
//     const id = Number(req.params.id);

//     const group = await prisma.rationGroup.update({
//       where: { id },
//       data: {
//         feedCompleted: true,
//         fedAt: new Date(),
//       },
//     });

//     res.json(group);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to feed TMR" });
//   }
// };
// export const getMixAccuracy = async (req: Request, res: Response) => {
//   try {
//     const groupId = Number(req.params.groupId);

//     const data = await prisma.rationMixLog.findMany({
//       where: {
//         rationIngredient: {
//           rationGroupId: groupId,
//         },
//       },
//       include: {
//         rationIngredient: {
//           include: { ingredient: true },
//         },
//       },
//     });

//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch mix accuracy" });
//   }
// };

/**
 * CREATE RATION GROUP (PPT – Step 1)
 */
export const createRationGroup = async (req: Request, res: Response) => {
  try {
    const {
      groupId,
      userId,
      date,
      animalCount,
      rationPercentage,
      plannedTmrQty,
      offeredTmrQty,
    } = req.body;

    // 1️⃣ Create ration plan for the date
    const rationPlan = await prisma.rationPlan.create({
      data: {
        date: new Date(date),
        createdBy: userId,
      },
    });

    // 2️⃣ Create ration group
    const rationGroup = await prisma.rationGroup.create({
      data: {
        rationPlanId: rationPlan.id,
        groupId,
        animalCount,
        rationPercentage,
        plannedTmrQty,
        offeredTmrQty,
        createdBy: userId,
        status: "DRAFT",
      },
    });

    return res.status(201).json(rationGroup);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create ration group" });
  }
};

/**
 * UPDATE RATION GROUP (MODIFY – PPT)
 */
export const updateRationGroup = async (req: Request, res: Response) => {
  try {
    const rationGroupId = Number(req.params.id);

    const {
      animalCount,
      rationPercentage,
      plannedTmrQty,
      offeredTmrQty,
      leftoverQty,
    } = req.body;

    const rationGroup = await prisma.rationGroup.update({
      where: { id: rationGroupId },
      data: {
        animalCount,
        rationPercentage,
        plannedTmrQty,
        offeredTmrQty,
        leftoverQty,
      },
    });

    return res.json(rationGroup);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update ration group" });
  }
};

/**
 * GET SINGLE RATION GROUP (EDIT MODE)
 */
export const getRationGroupById = async (req: Request, res: Response) => {
  try {
    const rationGroupId = Number(req.params.id);

    const rationGroup = await prisma.rationGroup.findUnique({
      where: { id: rationGroupId },
    });

    if (!rationGroup) {
      return res.status(404).json({ message: "Ration group not found" });
    }

    return res.json(rationGroup);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch ration group" });
  }
};

/**
 * FEED TMR (FINAL STEP – PPT)
 */
export const feedTmr = async (req: Request, res: Response) => {
  try {
    const rationGroupId = Number(req.params.id);
    const { leftoverQty } = req.body;

    const rationGroup = await prisma.rationGroup.update({
      where: { id: rationGroupId },
      data: {
        status: "FED",
        leftoverQty,
      },
    });

    return res.json({ message: "TMR fed successfully", rationGroup });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to feed TMR" });
  }
};

/**
 * ADD INGREDIENT TO RATION GROUP
 */
export const addRationIngredient = async (req: Request, res: Response) => {
  try {
    const {
      rationGroupId,
      ingredientId,
      qtyPerAnimal,
      animalCount,
      totalQty,
      dmPercent,
      mixTimeMinutes,
    } = req.body;

    const ingredient = await prisma.rationIngredient.create({
      data: {
        rationGroupId,
        ingredientId,
        qtyPerAnimal,
        animalCount,
        totalQty,
        dmPercent,
        mixTimeMinutes,
      },
    });

    res.status(201).json(ingredient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add ingredient" });
  }
};

/**
 * GET INGREDIENTS BY RATION GROUP
 */
export const getIngredientsByGroup = async (req: Request, res: Response) => {
  try {
    const rationGroupId = Number(req.params.rationGroupId);

    const ingredients = await prisma.rationIngredient.findMany({
      where: { rationGroupId },
      include: { ingredient: true },
    });

    res.json(ingredients);
  } catch {
    res.status(500).json({ message: "Failed to fetch ingredients" });
  }
};

/**
 * UPDATE INGREDIENT (MODIFY)
 */
export const updateRationIngredient = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const ingredient = await prisma.rationIngredient.update({
      where: { id },
      data: req.body,
    });

    res.json(ingredient);
  } catch {
    res.status(500).json({ message: "Failed to update ingredient" });
  }
};
/**
 * SAVE MIX LOG (PER INGREDIENT)
 */
export const saveMixLog = async (req: Request, res: Response) => {
  try {
    const {
      rationGroupId,
      rationIngredientId,
      plannedQty,
      actualQty,
      accuracyPercent,
    } = req.body;

    const mixLog = await prisma.mixLog.create({
      data: {
        rationGroupId,
        rationIngredientId,
        plannedQty,
        actualQty,
        accuracyPercent,
      },
    });

    res.status(201).json(mixLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save mix log" });
  }
};

/**
 * GET MIX ACCURACY (FINAL SCREEN)
 */
export const getMixAccuracy = async (req: Request, res: Response) => {
  try {
    const rationGroupId = Number(req.params.rationGroupId);

    const logs = await prisma.mixLog.findMany({
      where: { rationGroupId },
      include: {
        rationIngredient: {
          include: { ingredient: true },
        },
      },
    });

    res.json(logs);
  } catch {
    res.status(500).json({ message: "Failed to fetch mix accuracy" });
  }
};

/**
 * GET MIX ACCURACY BY RATION GROUP
 * PPT:
 * - Planned vs Actual
 * - Accuracy %
 * - Used for reports
 */
export const getMixAccuracyByGroup = async (req: Request, res: Response) => {
  try {
    const rationGroupId = Number(req.params.rationGroupId);

    const logs = await prisma.mixLog.findMany({
      where: { rationGroupId },
      include: {
        rationIngredient: {
          include: {
            ingredient: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });

    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch mix accuracy" });
  }
};
