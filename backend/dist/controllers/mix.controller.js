"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixSummary = exports.finalMixSummary = exports.saveMixLoad = void 0;
const client_1 = __importDefault(require("../prisma/client"));
/* Save mix load and update ingredient stock */
const saveMixLoad = async (req, res) => {
    const { ingredientId, userId, quantity, // load cell kg
    note, } = req.body;
    // Save consumption
    const consumption = await client_1.default.consumption.create({
        data: {
            ingredientId,
            quantity,
            note,
            userId,
        },
    });
    // Reduce stock
    await client_1.default.ingredient.update({
        where: { id: ingredientId },
        data: {
            currentStock: { decrement: quantity },
        },
    });
    res.json(consumption);
};
exports.saveMixLoad = saveMixLoad;
const finalMixSummary = async (req, res) => {
    const { groupId } = req.params;
    const consumptions = await client_1.default.consumption.findMany({
        include: { ingredient: true },
    });
    let allocated = 0;
    let loaded = 0;
    const items = consumptions.map((c) => {
        const allocatedKg = c.quantity; // planned
        const loadKg = c.quantity;
        allocated += allocatedKg;
        loaded += loadKg;
        return {
            ingredientId: c.ingredientId,
            name: c.ingredient.name,
            allocatedKg,
            loadKg,
            balanceKg: allocatedKg - loadKg,
        };
    });
    const accuracy = allocated === 0 ? 100 : Math.round((loaded / allocated) * 100);
    res.json({
        summary: {
            allocated,
            loaded,
            balance: allocated - loaded,
            accuracy,
        },
        items,
    });
};
exports.finalMixSummary = finalMixSummary;
const mixSummary = async (req, res) => {
    const consumptions = await client_1.default.consumption.findMany({
        include: { ingredient: true },
    });
    const summary = consumptions.map((c) => ({
        ingredient: c.ingredient.name,
        usedKg: c.quantity,
    }));
    res.json(summary);
};
exports.mixSummary = mixSummary;
