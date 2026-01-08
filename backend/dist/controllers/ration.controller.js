"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestRationGroup = exports.getMixAccuracyByGroup = exports.getMixAccuracy = exports.saveMixLog = exports.updateRationIngredient = exports.getIngredientsByGroup = exports.addRationIngredient = exports.feedTmr = exports.getRationGroupById = exports.updateRationGroup = exports.createRationGroup = exports.getGroupIngredients = exports.saveRationGroup = exports.createRationPlan = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const createRationPlan = async (req, res) => {
    try {
        const { date, userId } = req.body;
        const plan = await client_1.default.rationPlan.create({
            data: {
                date: new Date(date),
                createdBy: Number(userId),
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
        const { rationPlanId, groupId, animalCount, rationPercentage, plannedTmrQty, userId, } = req.body;
        const offeredTmrQty = plannedTmrQty * (rationPercentage / 100);
        const group = await client_1.default.rationGroup.findFirst({
            where: {
                rationPlanId,
                groupId,
                createdBy: Number(userId),
            },
        });
        if (group) {
            const updated = await client_1.default.rationGroup.update({
                where: { id: group.id },
                data: {
                    animalCount,
                    rationPercentage,
                    plannedTmrQty,
                    offeredTmrQty,
                },
            });
            res.json(updated);
            return;
        }
        const newGroup = await client_1.default.rationGroup.create({
            data: {
                rationPlanId,
                groupId,
                createdBy: Number(userId),
                animalCount,
                rationPercentage,
                plannedTmrQty,
                offeredTmrQty,
            },
        });
        res.json(newGroup);
        return;
        res.json(group);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to save ration group" });
    }
};
exports.saveRationGroup = saveRationGroup;
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
const createRationGroup = async (req, res) => {
    try {
        const { groupId, userId, date, animalCount, rationPercentage, plannedTmrQty, offeredTmrQty, } = req.body;
        // 1️⃣ Create ration plan for the date
        const rationPlan = await client_1.default.rationPlan.create({
            data: {
                date: new Date(date),
                createdBy: userId,
            },
        });
        // 2️⃣ Create ration group
        const rationGroup = await client_1.default.rationGroup.create({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to create ration group" });
    }
};
exports.createRationGroup = createRationGroup;
/**
 * UPDATE RATION GROUP (MODIFY – PPT)
 */
const updateRationGroup = async (req, res) => {
    try {
        const rationGroupId = Number(req.params.id);
        const { animalCount, rationPercentage, plannedTmrQty, offeredTmrQty, leftoverQty, } = req.body;
        const rationGroup = await client_1.default.rationGroup.update({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to update ration group" });
    }
};
exports.updateRationGroup = updateRationGroup;
/**
 * GET SINGLE RATION GROUP (EDIT MODE)
 */
const getRationGroupById = async (req, res) => {
    try {
        const rationGroupId = Number(req.params.id);
        const rationGroup = await client_1.default.rationGroup.findUnique({
            where: { id: rationGroupId },
        });
        if (!rationGroup) {
            return res.status(404).json({ message: "Ration group not found" });
        }
        return res.json(rationGroup);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch ration group" });
    }
};
exports.getRationGroupById = getRationGroupById;
/**
 * FEED TMR (FINAL STEP – PPT)
 */
const feedTmr = async (req, res) => {
    try {
        const rationGroupId = Number(req.params.id);
        const { leftoverQty } = req.body;
        const rationGroup = await client_1.default.rationGroup.update({
            where: { id: rationGroupId },
            data: {
                status: "FED",
                leftoverQty,
            },
        });
        return res.json({ message: "TMR fed successfully", rationGroup });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to feed TMR" });
    }
};
exports.feedTmr = feedTmr;
/**
 * ADD INGREDIENT TO RATION GROUP
 */
const addRationIngredient = async (req, res) => {
    try {
        const { rationGroupId, ingredientId, qtyPerAnimal, animalCount, totalQty, dmPercent, mixTimeMinutes, } = req.body;
        const ingredient = await client_1.default.rationIngredient.create({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add ingredient" });
    }
};
exports.addRationIngredient = addRationIngredient;
/**
 * GET INGREDIENTS BY RATION GROUP
 */
const getIngredientsByGroup = async (req, res) => {
    try {
        const rationGroupId = Number(req.params.rationGroupId);
        const ingredients = await client_1.default.rationIngredient.findMany({
            where: { rationGroupId },
            include: { ingredient: true },
        });
        res.json(ingredients);
    }
    catch {
        res.status(500).json({ message: "Failed to fetch ingredients" });
    }
};
exports.getIngredientsByGroup = getIngredientsByGroup;
/**
 * UPDATE INGREDIENT (MODIFY)
 */
const updateRationIngredient = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const ingredient = await client_1.default.rationIngredient.update({
            where: { id },
            data: req.body,
        });
        res.json(ingredient);
    }
    catch {
        res.status(500).json({ message: "Failed to update ingredient" });
    }
};
exports.updateRationIngredient = updateRationIngredient;
/**
 * SAVE MIX LOG (PER INGREDIENT)
 */
const saveMixLog = async (req, res) => {
    try {
        const { rationGroupId, rationIngredientId, plannedQty, actualQty, accuracyPercent, } = req.body;
        const mixLog = await client_1.default.mixLog.create({
            data: {
                rationGroupId,
                rationIngredientId,
                plannedQty,
                actualQty,
                accuracyPercent,
            },
        });
        res.status(201).json(mixLog);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to save mix log" });
    }
};
exports.saveMixLog = saveMixLog;
/**
 * GET MIX ACCURACY (FINAL SCREEN)
 */
const getMixAccuracy = async (req, res) => {
    try {
        const rationGroupId = Number(req.params.rationGroupId);
        const logs = await client_1.default.mixLog.findMany({
            where: { rationGroupId },
            include: {
                rationIngredient: {
                    include: { ingredient: true },
                },
            },
        });
        res.json(logs);
    }
    catch {
        res.status(500).json({ message: "Failed to fetch mix accuracy" });
    }
};
exports.getMixAccuracy = getMixAccuracy;
/**
 * GET MIX ACCURACY BY RATION GROUP
 * PPT:
 * - Planned vs Actual
 * - Accuracy %
 * - Used for reports
 */
const getMixAccuracyByGroup = async (req, res) => {
    const rationGroupId = Number(req.params.rationGroupId);
    const logs = await client_1.default.mixLog.findMany({
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
};
exports.getMixAccuracyByGroup = getMixAccuracyByGroup;
// GET LATEST RATION GROUP BY HERD GROUP
const getLatestRationGroup = async (req, res) => {
    try {
        const { groupId, userId } = req.params;
        const rationGroup = await client_1.default.rationGroup.findFirst({
            where: {
                groupId: Number(groupId),
                createdBy: Number(userId),
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });
        if (!rationGroup) {
            return res.status(404).json({
                message: "No ration group found",
            });
        }
        return res.json(rationGroup);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch latest ration group",
        });
    }
};
exports.getLatestRationGroup = getLatestRationGroup;
