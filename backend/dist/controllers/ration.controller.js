"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRationIngredient = exports.updateRationIngredient = exports.getRationByGroup = exports.getRationHistory = exports.upsertRation = exports.listIngredients = exports.createRation = void 0;
const client_1 = __importDefault(require("../prisma/client"));
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
const createRation = async (req, res) => {
    const { userId, groupId, name, no, kg, rationSize, days } = req.body;
    const total = no * kg;
    const ration = await client_1.default.ration.create({
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
exports.createRation = createRation;
const listIngredients = async (req, res) => {
    const { userId } = req.params;
    const ingredients = await client_1.default.ingredient.findMany({
        where: { userId: Number(userId) },
    });
    res.json(ingredients);
};
exports.listIngredients = listIngredients;
const upsertRation = async (req, res) => {
    const { userId, groupId, name, no, kg, rationSize, days } = req.body;
    const total = Number(no) * Number(kg);
    const ration = await client_1.default.ration.upsert({
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
exports.upsertRation = upsertRation;
/**
 * GET /ration/history/:groupId
 */
const getRationHistory = async (req, res) => {
    try {
        const groupId = Number(req.params.groupId);
        const userId = Number(req.query.userId);
        const history = await client_1.default.ration.findMany({
            where: { groupId, userId },
            orderBy: { createdAt: "desc" },
            take: 7,
            select: {
                total: true,
                createdAt: true,
            },
        });
        res.json({ history });
    }
    catch (error) {
        console.error("ration history error:", error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.getRationHistory = getRationHistory;
/**
 * GET RATION + INGREDIENTS
 */
const getRationByGroup = async (req, res) => {
    const groupId = Number(req.params.groupId);
    const ration = await client_1.default.ration.findFirst({
        where: { groupId },
    });
    const ingredients = await client_1.default.consumption.findMany({
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
        dm: c.ingredient.details?.dm ?? 0,
    }));
    res.json({
        ration,
        ingredients: mapped,
    });
};
exports.getRationByGroup = getRationByGroup;
/**
 * UPDATE INGREDIENT (PER ANIMAL KG)
 */
const updateRationIngredient = async (req, res) => {
    const id = Number(req.params.id);
    const { kg } = req.body;
    if (!id || isNaN(kg)) {
        return res.status(400).json({ error: "Invalid input" });
    }
    const updated = await client_1.default.consumption.update({
        where: { id },
        data: { quantity: Number(kg) },
    });
    res.json({ message: "Updated", data: updated });
};
exports.updateRationIngredient = updateRationIngredient;
/**
 * DELETE INGREDIENT FROM RATION
 */
const deleteRationIngredient = async (req, res) => {
    const id = Number(req.params.id);
    await client_1.default.consumption.delete({ where: { id } });
    res.json({ message: "Deleted" });
};
exports.deleteRationIngredient = deleteRationIngredient;
