"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMilkLoadCell = exports.saveMilk = void 0;
const client_1 = __importDefault(require("../prisma/client"));
// Save milk
const saveMilk = async (req, res) => {
    try {
        const { groupId, milkLit, shift, animalNumber, userId } = req.body;
        if (!groupId || !milkLit || !shift || !animalNumber) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        console.log("Milk backend: ", req.body);
        const entry = await client_1.default.milk.create({
            data: {
                groupId: Number(groupId),
                milkLit: Number(milkLit),
                shift,
                animalNumber: animalNumber.toString(),
                userId: userId,
            },
        });
        console.log("Saved entry:", entry);
        return res.json({ message: "Saved", entry });
    }
    catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
};
exports.saveMilk = saveMilk;
// Load cell mock
const readMilkLoadCell = async (_req, res) => {
    const random = Math.floor(Math.random() * 40); // 0–40 litres
    return res.json({ weight: random });
};
exports.readMilkLoadCell = readMilkLoadCell;
