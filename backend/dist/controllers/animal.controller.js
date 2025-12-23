"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAnimalDetails = exports.getAnimalDetails = exports.getAnimals = exports.addAnimal = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const addAnimal = async (req, res) => {
    try {
        const { animalNumber, groupId, userId, details } = req.body;
        console.log("animal: ", req.body);
        if (!animalNumber || !groupId || !userId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const animal = await client_1.default.animal.create({
            data: {
                animalNumber,
                groupId: Number(groupId),
                userId: Number(userId),
                details: details || {},
            },
        });
        return res.json(animal);
    }
    catch (error) {
        console.error("Add animal error:", error);
        return res.status(500).json({ error: "Server error" });
    }
};
exports.addAnimal = addAnimal;
const getAnimals = async (req, res) => {
    try {
        const animals = await client_1.default.animal.findMany({
            where: { userId: req.user.userId },
        });
        res.json(animals);
    }
    catch (err) {
        res.status(500).json({ error: "Error fetching animals" });
    }
};
exports.getAnimals = getAnimals;
const getAnimalDetails = async (req, res) => {
    const { animalNumber } = req.params;
    const animal = await client_1.default.animal.findFirst({
        where: { animalNumber: req.params.animalNumber },
    });
    if (!animal) {
        return res.status(404).json({ error: "Animal not found" });
    }
    return res.json(animal);
};
exports.getAnimalDetails = getAnimalDetails;
const updateAnimalDetails = async (req, res) => {
    const { animalNumber, groupId, userId, details } = req.body;
    const animal = await client_1.default.animal.findFirst({
        where: { animalNumber: animalNumber, userId: userId, groupId: groupId },
    });
    if (!animal) {
        return res.status(404).json({ error: "Animal not found" });
    }
    const updated = await client_1.default.animal.update({
        where: { id: animal.id },
        data: {
            details: {
                ...(animal.details || {}),
                ...details,
            },
        },
    });
    res.json(updated);
};
exports.updateAnimalDetails = updateAnimalDetails;
