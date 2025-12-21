import { Request, Response } from "express";
import prisma from "../prisma/client";
import { subDays, startOfDay } from "date-fns";

// 1) Herd summary (counts)
// export const herdSummary = async (_req: Request, res: Response) => {
//   try {
//     const [totalAnimals, totalGroups, milkingGroups, nonMilkingGroups] =
//       await Promise.all([
//         prisma.animal.count(),
//         prisma.group.count(),
//         prisma.group.count({ where: { type: "milking" } }),
//         prisma.group.count({ where: { type: "non-milking" } }),
//       ]);

//     res.json({
//       totalAnimals,
//       totalGroups,
//       milkingGroups,
//       nonMilkingGroups,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// 2) Milk per day (last 7 days) for a given group
export const milkLast7Days = async (req: Request, res: Response) => {
  try {
    const groupId = Number(req.params.groupId);
    const fromDate = subDays(new Date(), 6); // last 7 days incl today

    const data = await prisma.milk.groupBy({
      by: ["date"],
      where: {
        groupId,
        date: {
          gte: startOfDay(fromDate),
        },
      },
      _sum: { milkLit: true },
      orderBy: { date: "asc" },
    });

    res.json(
      data.map((d) => ({
        date: d.date.toISOString().split("T")[0],
        milkLit: d._sum.milkLit || 0,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// 3) Leftover by group (last 30 days)
export const leftoverByGroup = async (_req: Request, res: Response) => {
  try {
    const fromDate = subDays(new Date(), 29);

    // group by date + groupId
    const rows = await prisma.leftover.groupBy({
      by: ["date", "groupId"],
      where: {
        date: { gte: startOfDay(fromDate) },
      },
      _sum: { leftoverKg: true },
      orderBy: [{ date: "asc" }, { groupId: "asc" }],
    });

    res.json(
      rows.map((r) => ({
        date: r.date.toISOString().split("T")[0],
        groupId: r.groupId,
        leftoverKg: r._sum.leftoverKg || 0,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
