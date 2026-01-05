"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMixAccuracy = exports.feedTmr = exports.saveMixLog = exports.getGroupIngredients = exports.addRationIngredient = exports.saveRationGroup = exports.createRationPlan = void 0;
const client_1 = __importDefault(require("../prisma/client"));
// export const createRation = async (req: Request, res: Response) => {
//   const { userId, groupId, name, no, kg, rationSize, days } = req.body;
//   const total = no * kg;
//   const ration = await prisma.ration.create({
//     data: {
//       userId,
//       groupId,
//       name,
//       no,
//       kg,
//       total,
//       rationSize,
//       days,
//       thisLoad: 0,
//       lastLoad: 0,
//       diff: 0,
//     },
//   });
//   res.json(ration);
// };
// export const listIngredients = async (req: Request, res: Response) => {
//   const { userId } = req.params;
//   const ingredients = await prisma.ingredient.findMany({
//     where: { userId: Number(userId) },
//   });
//   res.json(ingredients);
// };
// export const upsertRation = async (req: Request, res: Response) => {
//   const { userId, groupId, name, no, kg, rationSize, days } = req.body;
//   const total = Number(no) * Number(kg);
//   const ration = await prisma.ration.upsert({
//     where: {
//       id: undefined, // Replace with the actual unique field or composite key from your schema
//     },
//     update: {
//       name,
//       no,
//       kg,
//       total,
//       rationSize,
//       days,
//     },
//     create: {
//       userId,
//       groupId,
//       name,
//       no,
//       kg,
//       total,
//       rationSize,
//       days,
//       thisLoad: 0,
//       lastLoad: 0,
//       diff: 0,
//     },
//   });
//   res.json(ration);
// };
// /**
//  * GET /ration/history/:groupId
//  */
// export const getRationHistory = async (req: Request, res: Response) => {
//   try {
//     const groupId = Number(req.params.groupId);
//     const userId = Number(req.query.userId);
//     const history = await prisma.ration.findMany({
//       where: { groupId, userId },
//       orderBy: { createdAt: "desc" },
//       take: 7,
//       select: {
//         total: true,
//         createdAt: true,
//       },
//     });
//     res.json({ history });
//   } catch (error) {
//     console.error("ration history error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };
// /**
//  * GET RATION + INGREDIENTS
//  */
// export const getRationByGroup = async (req: Request, res: Response) => {
//   const groupId = Number(req.params.groupId);
//   const ration = await prisma.ration.findFirst({
//     where: { groupId },
//   });
//   const ingredients = await prisma.consumption.findMany({
//     where: { ingredient: { userId: ration?.userId } },
//     include: {
//       ingredient: true,
//     },
//   });
//   const mapped = ingredients.map((c) => ({
//     consumptionId: c.id,
//     ingredientId: c.ingredientId,
//     name: c.ingredient.name,
//     quantity: c.quantity,
//     dm: (c.ingredient.details as any)?.dm ?? 0,
//   }));
//   res.json({
//     ration,
//     ingredients: mapped,
//   });
// };
// /**
//  * UPDATE INGREDIENT (PER ANIMAL KG)
//  */
// export const updateRationIngredient = async (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   const { kg } = req.body;
//   if (!id || isNaN(kg)) {
//     return res.status(400).json({ error: "Invalid input" });
//   }
//   const updated = await prisma.consumption.update({
//     where: { id },
//     data: { quantity: Number(kg) },
//   });
//   res.json({ message: "Updated", data: updated });
// };
// /**
//  * DELETE INGREDIENT FROM RATION
//  */
// export const deleteRationIngredient = async (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   await prisma.consumption.delete({ where: { id } });
//   res.json({ message: "Deleted" });
// };
const createRationPlan = async (req, res) => {
    try {
        const { date, createdBy } = req.body;
        const plan = await client_1.default.rationPlan.upsert({
            where: { date: new Date(date) },
            update: {},
            create: {
                date: new Date(date),
                createdBy,
            },
        });
        res.json(plan);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create ration plan" });
    }
};
exports.createRationPlan = createRationPlan;
const saveRationGroup = async (req, res) => {
    try {
        const { rationPlanId, groupId, animalCount, rationPercentage, plannedTmrQty, } = req.body;
        const offeredTmrQty = plannedTmrQty * (rationPercentage / 100);
        const group = await client_1.default.rationGroup.upsert({
            where: {
                rationPlanId_groupId: {
                    rationPlanId,
                    groupId,
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
                animalCount,
                rationPercentage,
                plannedTmrQty,
                offeredTmrQty,
            },
        });
        res.json(group);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to save ration group" });
    }
};
exports.saveRationGroup = saveRationGroup;
const addRationIngredient = async (req, res) => {
    try {
        const { rationGroupId, ingredientId, qtyPerAnimal, animalCount, dmPercent, mixTimeMinutes, } = req.body;
        const totalQty = qtyPerAnimal * animalCount;
        const dmKg = totalQty * (dmPercent / 100);
        const ingredient = await client_1.default.rationIngredient.create({
            data: {
                rationGroupId,
                ingredientId,
                qtyPerAnimal,
                totalQty,
                dmPercent,
                dmKg,
                mixTimeMinutes,
            },
        });
        res.json(ingredient);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add ingredient" });
    }
};
exports.addRationIngredient = addRationIngredient;
const getGroupIngredients = async (req, res) => {
    try {
        const groupId = Number(req.params.groupId);
        const ingredients = await client_1.default.rationIngredient.findMany({
            where: { rationGroupId: groupId },
            include: {
                ingredient: true,
            },
            orderBy: { id: "asc" },
        });
        res.json(ingredients);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch ingredients" });
    }
};
exports.getGroupIngredients = getGroupIngredients;
const saveMixLog = async (req, res) => {
    try {
        const { rationIngredientId, plannedQty, actualQty } = req.body;
        const accuracyPercent = (actualQty / plannedQty) * 100;
        const log = await client_1.default.rationMixLog.create({
            data: {
                rationIngredientId,
                plannedQty,
                actualQty,
                accuracyPercent,
            },
        });
        res.json(log);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to save mix log" });
    }
};
exports.saveMixLog = saveMixLog;
const feedTmr = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const group = await client_1.default.rationGroup.update({
            where: { id },
            data: {
                feedCompleted: true,
                fedAt: new Date(),
            },
        });
        res.json(group);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to feed TMR" });
    }
};
exports.feedTmr = feedTmr;
const getMixAccuracy = async (req, res) => {
    try {
        const groupId = Number(req.params.groupId);
        const data = await client_1.default.rationMixLog.findMany({
            where: {
                rationIngredient: {
                    rationGroupId: groupId,
                },
            },
            include: {
                rationIngredient: {
                    include: { ingredient: true },
                },
            },
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch mix accuracy" });
    }
};
exports.getMixAccuracy = getMixAccuracy;
