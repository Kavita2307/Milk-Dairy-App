"use strict";
// import { Request, Response } from "express";
// import prisma from "../prisma/client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIngredient = exports.getIngredientById = exports.addStock = exports.getIngredients = exports.createIngredient = void 0;
const client_1 = __importDefault(require("../prisma/client"));
/**
 * CREATE INGREDIENT
 */
const createIngredient = async (req, res) => {
    try {
        const { name, price, dryMatter, currentStock, userId } = req.body;
        const ingredient = await client_1.default.ingredient.create({
            data: {
                name,
                details: {
                    price,
                    dryMatter,
                },
                currentStock,
                userId,
            },
        });
        res.status(201).json(ingredient);
    }
    catch (err) {
        res.status(400).json({ message: "Ingredient already exists" });
    }
};
exports.createIngredient = createIngredient;
/**
 * GET INGREDIENTS (Alphabetical Order)
 */
const getIngredients = async (_req, res) => {
    const ingredients = await client_1.default.ingredient.findMany({
        orderBy: { name: "asc" },
    });
    res.json(ingredients);
};
exports.getIngredients = getIngredients;
/**
 * ADD STOCK
 */
const addStock = async (req, res) => {
    const { ingredientId, quantity, note } = req.body;
    console.log("Add stock request:", { ingredientId, quantity, note });
    await client_1.default.$transaction([
        client_1.default.stockEntry.create({
            data: { ingredientId, quantity, note },
        }),
        client_1.default.ingredient.update({
            where: { id: ingredientId },
            data: { currentStock: { increment: quantity } },
        }),
    ]);
    res.json({ message: "Stock added successfully" });
};
exports.addStock = addStock;
// export const getIngredientById = async (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   const ingredient = await prisma.ingredient.findUnique({
//     where: { id },
//   });
//   if (!ingredient) return res.status(404).json({ error: "Not found" });
//   res.json(ingredient);
// };
const getIngredientById = async (req, res) => {
    const ingredientId = Number(req.params.id);
    const ingredient = await client_1.default.ingredient.findUnique({
        where: { id: ingredientId },
        include: {
            stockEntries: true,
            consumptions: true,
        },
    });
    if (!ingredient) {
        return res.status(404).json({ message: "Ingredient not found" });
    }
    // Calculate daily consumption (example: today)
    const dailyConsumption = ingredient.consumptions.reduce((sum, c) => sum + c.quantity, 0);
    const daysLeft = dailyConsumption > 0 ? ingredient.currentStock / dailyConsumption : null;
    const details = ingredient.details;
    res.json({
        id: ingredient.id,
        name: ingredient.name,
        price: details?.price,
        dryMatter: details?.dryMatter,
        currentStock: ingredient.currentStock,
        dailyConsumption,
        daysLeft,
    });
};
exports.getIngredientById = getIngredientById;
const updateIngredient = async (req, res) => {
    try {
        const ingredientId = Number(req.params.id);
        const { name, price, dryMatter } = req.body;
        const ingredient = await client_1.default.ingredient.update({
            where: { id: ingredientId },
            data: {
                name,
                details: {
                    price,
                    dryMatter,
                },
            },
        });
        res.json(ingredient);
    }
    catch (error) {
        res.status(400).json({ message: "Ingredient update failed" });
    }
};
exports.updateIngredient = updateIngredient;
