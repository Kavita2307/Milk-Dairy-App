"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readLoadCell = exports.getLeftoverHistory = exports.saveLeftover = void 0;
const client_1 = __importDefault(require("../prisma/client"));
// 📌 Save leftover entry
const saveLeftover = async (req, res) => {
    try {
        const { groupId, leftoverKg, userId } = req.body;
        if (!groupId || leftoverKg === undefined) {
            return res.status(400).json({ error: "Missing groupId or leftoverKg" });
        }
        const entry = await client_1.default.leftover.create({
            data: {
                groupId: Number(groupId),
                leftoverKg: Number(leftoverKg),
                userId: Number(userId),
            },
        });
        return res.json({ message: "Saved successfully", entry });
    }
    catch (err) {
        console.error("Save leftover error:", err);
        return res.status(500).json({ error: "Server error" });
    }
};
exports.saveLeftover = saveLeftover;
//  Get leftover history for a group
const getLeftoverHistory = async (req, res) => {
    try {
        const groupId = Number(req.params.groupId);
        const entries = await client_1.default.leftover.findMany({
            where: { groupId },
            orderBy: { date: "desc" },
        });
        return res.json(entries);
    }
    catch (err) {
        console.error("Get leftover error:", err);
        return res.status(500).json({ error: "Server error" });
    }
};
exports.getLeftoverHistory = getLeftoverHistory;
// 📌 Load Cell Reading (Simulated)
const readLoadCell = async (_req, res) => {
    try {
        // Here you can integrate actual hardware
        const randomWeight = Math.floor(Math.random() * 200); // Fake load cell
        return res.json({ weight: randomWeight });
    }
    catch (err) {
        console.error("Load cell read error:", err);
        return res.status(500).json({ error: "Cannot read load cell" });
    }
};
exports.readLoadCell = readLoadCell;
