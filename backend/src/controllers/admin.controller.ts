import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getFarmers = async (req: Request, res: Response) => {
  const { approved } = req.query;

  const farmers = await prisma.user.findMany({
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

export const updateFarmerStatus = async (req: Request, res: Response) => {
  const { farmerId, approve } = req.body;

  await prisma.user.update({
    where: { id: farmerId },
    data: { isApproved: approve },
  });

  res.json({ success: true });
};

export const getFarmerById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const farmer = await prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  res.json(farmer);
};
export const upsertAdminRation = async (req: Request, res: Response) => {
  const { groupId, days, kgPerAnimal, ingredients } = req.body;

  // delete old ration for group
  await prisma.adminRationIngredient.deleteMany({
    where: { ration: { groupId } },
  });

  await prisma.adminRation.deleteMany({
    where: { groupId },
  });

  const ration = await prisma.adminRation.create({
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

export const getAdminRation = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  const ration = await prisma.adminRation.findFirst({
    where: { groupId: Number(groupId) },
    include: { ingredients: true },
  });

  res.json(ration);
};
