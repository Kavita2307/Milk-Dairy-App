import { Request, Response } from "express";
import prisma from "../prisma/client";

export const dailyFeedEfficiency = async (req: Request, res: Response) => {
  try {
    const { groupId, date, tmrDmPercent, tmrCostPerKg } = req.body;

    const reportDate = new Date(date);

    /* 1️⃣ Total Milking Cows */
    const totalMilkingCows = await prisma.animal.count({
      where: { groupId: { lt: 4 } },
    });

    if (totalMilkingCows === 0) {
      return res.status(400).json({
        message: "No animals found in this group",
      });
    }

    /* 2️⃣ Total TMR Fed (from Ration) */
    const totalTMRFed = await prisma.ration.aggregate({
      where: { groupId },
      _sum: { kg: true },
    });

    const totalTMRFedKg = totalTMRFed._sum.kg || 0;

    /* 3️⃣ Leftover */
    const leftover = await prisma.leftover.findFirst({
      where: {
        groupId,
        date: reportDate,
      },
    });

    const leftoverKg = leftover?.leftoverKg || 0;
    const leftoverPercent =
      totalTMRFedKg > 0 ? (leftoverKg / totalTMRFedKg) * 100 : 0;

    /* 4️⃣ TMR Intake */
    const totalTMRIntakeKg = totalTMRFedKg - leftoverKg;
    const avgTMRIntakePerCow = totalTMRIntakeKg / totalMilkingCows;

    /* 5️⃣ DM Intake */
    const avgDMIntakePerCow = avgTMRIntakePerCow * (tmrDmPercent / 100);

    /* 6️⃣ Milk Yield */
    const milkAgg = await prisma.milk.aggregate({
      where: {
        groupId,
        date: reportDate,
      },
      _sum: { milkLit: true },
    });

    const totalMilkLtr = milkAgg._sum.milkLit || 0;
    const groupAvgMilk = totalMilkLtr / totalMilkingCows;

    /* 7️⃣ DMI per Litre Milk (grams) */
    const dmiPerLtrMilk =
      groupAvgMilk > 0 ? (avgDMIntakePerCow / groupAvgMilk) * 1000 : 0;

    /* 8️⃣ Feeding Cost */
    const feedingCostPerCow = avgTMRIntakePerCow * tmrCostPerKg;

    const feedingCostPerLtr =
      groupAvgMilk > 0 ? feedingCostPerCow / groupAvgMilk : 0;

    return res.status(200).json({
      date,
      groupId,
      totalMilkingCows,
      totalTMRFedKg,
      leftoverKg,
      leftoverPercent: Number(leftoverPercent.toFixed(2)),
      avgTMRIntakePerCow: Number(avgTMRIntakePerCow.toFixed(2)),
      avgDMIntakePerCow: Number(avgDMIntakePerCow.toFixed(2)),
      totalMilkLtr,
      groupAvgMilk: Number(groupAvgMilk.toFixed(2)),
      dmiPerLtrMilk: Number(dmiPerLtrMilk.toFixed(0)),
      feedingCostPerCow: Number(feedingCostPerCow.toFixed(2)),
      feedingCostPerLtr: Number(feedingCostPerLtr.toFixed(2)),
    });
  } catch (error) {
    console.error("Daily Feed Efficiency Error:", error);
    return res.status(500).json({
      message: "Failed to generate daily feed efficiency report",
    });
  }
};
