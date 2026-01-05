"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnimalCountByGroup = exports.getAdminRation = exports.upsertAdminRation = exports.getFarmerById = exports.updateFarmerStatus = exports.getFarmers = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getFarmers = async (req, res) => {
    const { approved } = req.query;
    const farmers = await client_1.default.user.findMany({
        where: {
            role: "farmer",
            isApproved: approved === "true",
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            isApproved: true,
        },
    });
    res.json(farmers);
};
exports.getFarmers = getFarmers;
const updateFarmerStatus = async (req, res) => {
    const { farmerId, approve } = req.body;
    await client_1.default.user.update({
        where: { id: farmerId },
        data: { isApproved: approve },
    });
    res.json({ success: true });
};
exports.updateFarmerStatus = updateFarmerStatus;
const getFarmerById = async (req, res) => {
    const { id } = req.params;
    const farmer = await client_1.default.user.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
    res.json(farmer);
};
exports.getFarmerById = getFarmerById;
const upsertAdminRation = async (req, res) => {
    const { groupId, days, kgPerAnimal, ingredients } = req.body;
    // delete old ration for group
    await client_1.default.adminRationIngredient.deleteMany({
        where: { ration: { groupId } },
    });
    await client_1.default.adminRation.deleteMany({
        where: { groupId },
    });
    const ration = await client_1.default.adminRation.create({
        data: {
            groupId,
            days,
            kgPerAnimal,
            ingredients: {
                create: ingredients,
            },
        },
        include: { ingredients: true },
    });
    res.json(ration);
};
exports.upsertAdminRation = upsertAdminRation;
const getAdminRation = async (req, res) => {
    const { groupId } = req.params;
    const ration = await client_1.default.adminRation.findFirst({
        where: { groupId: Number(groupId) },
        include: { ingredients: true },
    });
    res.json(ration);
};
exports.getAdminRation = getAdminRation;
const getAnimalCountByGroup = async (req, res) => {
    try {
        const groupId = Number(req.params.groupId);
        const count = await client_1.default.animal.count({
            where: { groupId },
        });
        res.json({ count });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch animal count" });
    }
};
exports.getAnimalCountByGroup = getAnimalCountByGroup;
