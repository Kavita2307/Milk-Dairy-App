"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leftoverByGroup = exports.milkLast7Days = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const date_fns_1 = require("date-fns");
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
const milkLast7Days = async (req, res) => {
    try {
        const groupId = Number(req.params.groupId);
        const fromDate = (0, date_fns_1.subDays)(new Date(), 6); // last 7 days incl today
        const data = await client_1.default.milk.groupBy({
            by: ["date"],
            where: {
                groupId,
                date: {
                    gte: (0, date_fns_1.startOfDay)(fromDate),
                },
            },
            _sum: { milkLit: true },
            orderBy: { date: "asc" },
        });
        res.json(data.map((d) => ({
            date: d.date.toISOString().split("T")[0],
            milkLit: d._sum.milkLit || 0,
        })));
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
exports.milkLast7Days = milkLast7Days;
// 3) Leftover by group (last 30 days)
const leftoverByGroup = async (_req, res) => {
    try {
        const fromDate = (0, date_fns_1.subDays)(new Date(), 29);
        // group by date + groupId
        const rows = await client_1.default.leftover.groupBy({
            by: ["date", "groupId"],
            where: {
                date: { gte: (0, date_fns_1.startOfDay)(fromDate) },
            },
            _sum: { leftoverKg: true },
            orderBy: [{ date: "asc" }, { groupId: "asc" }],
        });
        res.json(rows.map((r) => ({
            date: r.date.toISOString().split("T")[0],
            groupId: r.groupId,
            leftoverKg: r._sum.leftoverKg || 0,
        })));
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
exports.leftoverByGroup = leftoverByGroup;
