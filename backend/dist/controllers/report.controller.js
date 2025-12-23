"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupWiseDailyMilkAvgReport = exports.getCowNumbers = exports.cowWiseMilkReport = exports.dailyAverageDmiReport = exports.dailyFeedEfficiencyReport = void 0;
const client_1 = __importDefault(require("../prisma/client"));
// export const dailyFeedEfficiency = async (req: Request, res: Response) => {
//   try {
//     const { groupId, date, tmrDmPercent, tmrCostPerKg } = req.body;
//     const reportDate = new Date(date);
//     /* 1️⃣ Total Milking Cows */
//     const totalMilkingCows = await prisma.animal.count({
//       where: { groupId: { lt: 4 } },
//     });
//     if (totalMilkingCows === 0) {
//       return res.status(400).json({
//         message: "No animals found in this group",
//       });
//     }
//     /* 2️⃣ Total TMR Fed (from Ration) */
//     const totalTMRFed = await prisma.ration.aggregate({
//       where: { groupId },
//       _sum: { kg: true },
//     });
//     const totalTMRFedKg = totalTMRFed._sum.kg || 0;
//     /* 3️⃣ Leftover */
//     const leftover = await prisma.leftover.findFirst({
//       where: {
//         groupId,
//         date: reportDate,
//       },
//     });
//     const leftoverKg = leftover?.leftoverKg || 0;
//     const leftoverPercent =
//       totalTMRFedKg > 0 ? (leftoverKg / totalTMRFedKg) * 100 : 0;
//     /* 4️⃣ TMR Intake */
//     const totalTMRIntakeKg = totalTMRFedKg - leftoverKg;
//     const avgTMRIntakePerCow = totalTMRIntakeKg / totalMilkingCows;
//     /* 5️⃣ DM Intake */
//     const avgDMIntakePerCow = avgTMRIntakePerCow * (tmrDmPercent / 100);
//     /* 6️⃣ Milk Yield */
//     const milkAgg = await prisma.milk.aggregate({
//       where: {
//         groupId,
//         date: reportDate,
//       },
//       _sum: { milkLit: true },
//     });
//     const totalMilkLtr = milkAgg._sum.milkLit || 0;
//     const groupAvgMilk = totalMilkLtr / totalMilkingCows;
//     /* 7️⃣ DMI per Litre Milk (grams) */
//     const dmiPerLtrMilk =
//       groupAvgMilk > 0 ? (avgDMIntakePerCow / groupAvgMilk) * 1000 : 0;
//     /* 8️⃣ Feeding Cost */
//     const feedingCostPerCow = avgTMRIntakePerCow * tmrCostPerKg;
//     const feedingCostPerLtr =
//       groupAvgMilk > 0 ? feedingCostPerCow / groupAvgMilk : 0;
//     return res.status(200).json({
//       date,
//       groupId,
//       totalMilkingCows,
//       totalTMRFedKg,
//       leftoverKg,
//       leftoverPercent: Number(leftoverPercent.toFixed(2)),
//       avgTMRIntakePerCow: Number(avgTMRIntakePerCow.toFixed(2)),
//       avgDMIntakePerCow: Number(avgDMIntakePerCow.toFixed(2)),
//       totalMilkLtr,
//       groupAvgMilk: Number(groupAvgMilk.toFixed(2)),
//       dmiPerLtrMilk: Number(dmiPerLtrMilk.toFixed(0)),
//       feedingCostPerCow: Number(feedingCostPerCow.toFixed(2)),
//       feedingCostPerLtr: Number(feedingCostPerLtr.toFixed(2)),
//     });
//   } catch (error) {
//     console.error("Daily Feed Efficiency Error:", error);
//     return res.status(500).json({
//       message: "Failed to generate daily feed efficiency report",
//     });
//   }
// };
const dailyFeedEfficiencyReport = async (req, res) => {
    console.log("in report controller");
    try {
        const userId = Number(req.query.userId);
        const groupId = Number(req.query.groupId);
        const dateStr = req.query.date;
        console.log("userId and date: ", userId, dateStr);
        if (!dateStr) {
            return res.status(400).json({ message: "Date is required" });
        }
        const start = new Date(`${dateStr}T00:00:00`);
        const end = new Date(`${dateStr}T23:59:59`);
        /* -----------------------------------
           1. TOTAL HERD STRENGTH
        ----------------------------------- */
        const totalHerdStrength = await client_1.default.animal.count({
            where: { userId },
        });
        /* -----------------------------------
           2. GROUP WISE ANIMAL COUNT
        ----------------------------------- */
        const animalCounts = await client_1.default.animal.groupBy({
            by: ["groupId"],
            where: { userId },
            _count: { id: true },
        });
        const animalsByGroup = {};
        animalCounts.forEach((a) => {
            animalsByGroup[a.groupId] = a._count.id;
        });
        /* -----------------------------------
           3. GROUP WISE MILK
        ----------------------------------- */
        const milkData = await client_1.default.milk.groupBy({
            by: ["groupId"],
            where: {
                userId,
                date: { gte: start, lte: end },
            },
            _sum: { milkLit: true },
        });
        const milkByGroup = {};
        milkData.forEach((m) => {
            milkByGroup[m.groupId] = m._sum.milkLit || 0;
        });
        /* -----------------------------------
           4. GROUP WISE TMR FED
        ----------------------------------- */
        const tmrData = await client_1.default.ration.groupBy({
            by: ["groupId"],
            where: {
                userId,
                createdAt: { gte: start, lte: end },
            },
            _sum: { total: true },
        });
        const tmrByGroup = {};
        tmrData.forEach((t) => {
            tmrByGroup[t.groupId] = t._sum.total || 0;
        });
        /* -----------------------------------
           5. LEFTOVER
        ----------------------------------- */
        const leftoverData = await client_1.default.leftover.groupBy({
            by: ["groupId"],
            where: {
                userId,
                date: { gte: start, lte: end },
            },
            _sum: { leftoverKg: true },
        });
        const leftoverByGroup = {};
        leftoverData.forEach((l) => {
            leftoverByGroup[l.groupId] = l._sum.leftoverKg || 0;
        });
        /* -----------------------------------
           6. FEED COST & DMI
        ----------------------------------- */
        const consumptions = await client_1.default.consumption.findMany({
            where: {
                userId,
                createdAt: { gte: start, lte: end },
            },
            include: {
                ingredient: true,
            },
        });
        let totalFeedCost = 0;
        let totalDM = 0;
        // consumptions.forEach((c) => {
        //   const price = Number(c.ingredient.details?.price || 0);
        //   const dmPercent = Number(c.ingredient.details?.dryMatter || 0);
        //   totalFeedCost += c.quantity * price;
        //   totalDM += c.quantity * (dmPercent / 100);
        // });
        /* -----------------------------------
           7. BUILD GROUP REPORT
        ----------------------------------- */
        const groups = {};
        const allGroupIds = new Set([
            ...Object.keys(animalsByGroup).map(Number),
            ...Object.keys(milkByGroup).map(Number),
            ...Object.keys(tmrByGroup).map(Number),
        ]);
        allGroupIds.forEach((groupId) => {
            const animals = animalsByGroup[groupId] || 0;
            const totalMilk = milkByGroup[groupId] || 0;
            const tmrFed = tmrByGroup[groupId] || 0;
            const leftover = leftoverByGroup[groupId] || 0;
            const tmrIntake = tmrFed - leftover;
            const avgMilk = animals > 0 ? totalMilk / animals : 0;
            const perAnimalTmr = animals > 0 ? tmrIntake / animals : 0;
            groups[groupId] = {
                animals,
                totalMilk,
                avgMilk: Number(avgMilk.toFixed(2)),
                tmrFed,
                leftover,
                tmrIntake,
                perAnimalTmr: Number(perAnimalTmr.toFixed(2)),
            };
        });
        /* -----------------------------------
           8. OVERALL KPIs
        ----------------------------------- */
        const totalMilk = Object.values(milkByGroup).reduce((a, b) => a + b, 0);
        const feedCostPerLiter = totalMilk > 0 ? totalFeedCost / totalMilk : 0;
        const dmiPerLiter = totalMilk > 0 ? totalDM / totalMilk : 0;
        /* -----------------------------------
           FINAL RESPONSE
        ----------------------------------- */
        res.json({
            date: dateStr,
            totalHerdStrength,
            totalMilk,
            totalFeedCost: Number(totalFeedCost.toFixed(2)),
            feedCostPerLiter: Number(feedCostPerLiter.toFixed(2)),
            totalDryMatter: Number(totalDM.toFixed(2)),
            dmiPerLiter: Number(dmiPerLiter.toFixed(2)),
            groups,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Report generation failed" });
    }
};
exports.dailyFeedEfficiencyReport = dailyFeedEfficiencyReport;
//Milking groups only
const MILKING_GROUPS = [1, 2, 3];
const dailyAverageDmiReport = async (req, res) => {
    try {
        const userId = Number(req.query.userId);
        // Default last 7 days
        const toDate = req.query.to ? new Date(req.query.to) : new Date();
        const fromDate = req.query.from
            ? new Date(req.query.from)
            : new Date(new Date().setDate(toDate.getDate() - 6));
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
        /* -----------------------------
           Animal count per group
        ------------------------------ */
        const animals = await client_1.default.animal.groupBy({
            by: ["groupId"],
            where: {
                userId,
                groupId: { in: MILKING_GROUPS },
            },
            _count: { id: true },
        });
        const animalCount = {};
        animals.forEach((a) => {
            animalCount[a.groupId] = a._count.id;
        });
        /* -----------------------------
           Consumption with DM
        ------------------------------ */
        const consumptions = await client_1.default.consumption.findMany({
            where: {
                createdAt: { gte: fromDate, lte: toDate },
            },
            include: {
                ingredient: true,
            },
        });
        /* -----------------------------
           Build date-wise DMI
        ------------------------------ */
        const report = {};
        // consumptions.forEach((c) => {
        //   const dateKey = c.createdAt.toISOString().split("T")[0];
        //   const dmPercent = Number(c.ingredient.details?.dryMatter || 0);
        //   const dmKg = c.quantity * (dmPercent / 100);
        //      if (!isFinite(dmKg)) return;
        //   if (!report[dateKey]) {
        //     report[dateKey] = {};
        //   }
        //   // NOTE: You may later tag consumption by group.
        //   MILKING_GROUPS.forEach((groupId) => {
        //     report[dateKey][groupId] = (report[dateKey][groupId] || 0) + dmKg;
        //   });
        // });
        /* -----------------------------
           Final average DMI
        ------------------------------ */
        const result = [];
        for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toISOString().split("T")[0];
            const row = { date: dateKey };
            MILKING_GROUPS.forEach((groupId) => {
                const animals = animalCount[groupId] || 0;
                const totalDmi = report[dateKey]?.[groupId] || 0;
                row[`group${groupId}`] =
                    animals > 0 && isFinite(totalDmi)
                        ? Number((totalDmi / animals).toFixed(2))
                        : 0;
            });
            result.push(row);
        }
        /* -----------------------------
           6. RESPONSE
        ------------------------------ */
        res.json({
            from: fromDate.toISOString().split("T")[0],
            to: toDate.toISOString().split("T")[0],
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to generate DMI report" });
    }
};
exports.dailyAverageDmiReport = dailyAverageDmiReport;
const cowWiseMilkReport = async (req, res) => {
    try {
        const userId = Number(req.query.userId);
        const animalNumber = req.query.cowNo;
        if (!userId || !animalNumber) {
            return res.status(400).json({
                message: "userId and cowNo are required",
            });
        }
        // Default last 7 days
        const toDate = req.query.to ? new Date(req.query.to) : new Date();
        const fromDate = req.query.from
            ? new Date(req.query.from)
            : new Date(new Date(toDate).setDate(toDate.getDate() - 6));
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
        /* -----------------------------
           MILK DATA (DATE-WISE)
        ------------------------------ */
        const milkRows = await client_1.default.milk.groupBy({
            by: ["date"],
            where: {
                animalNumber,
                date: { gte: fromDate, lte: toDate },
            },
            _sum: { milkLit: true },
            orderBy: { date: "asc" },
        });
        let totalMilk = 0;
        const rows = milkRows.map((r) => {
            const milk = r._sum.milkLit || 0;
            totalMilk += milk;
            return {
                date: r.date.toISOString().split("T")[0],
                milk,
            };
        });
        const avg7Day = rows.length > 0 ? Number((totalMilk / rows.length).toFixed(1)) : 0;
        res.json({
            cowNo: animalNumber,
            from: fromDate.toISOString().split("T")[0],
            to: toDate.toISOString().split("T")[0],
            rows,
            avg7Day,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Cow wise report failed" });
    }
};
exports.cowWiseMilkReport = cowWiseMilkReport;
const getCowNumbers = async (req, res) => {
    try {
        const userId = Number(req.query.userId);
        console.log("userid: ", userId);
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        const cows = await client_1.default.animal.findMany({
            where: {
                userId: userId,
                groupId: { lt: 4 },
            },
            select: {
                animalNumber: true,
            },
            orderBy: {
                animalNumber: "asc",
            },
        });
        console.log("cows:", cows);
        res.json({
            cows: cows.map((c) => c.animalNumber),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch cow numbers" });
    }
};
exports.getCowNumbers = getCowNumbers;
const groupWiseDailyMilkAvgReport = async (req, res) => {
    try {
        const userId = Number(req.query.userId);
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        // Default last 7 days
        const toDate = req.query.to ? new Date(req.query.to) : new Date();
        const fromDate = req.query.from
            ? new Date(req.query.from)
            : new Date(new Date(toDate).setDate(toDate.getDate() - 6));
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
        /* -----------------------------
           Animal count per group
        ------------------------------ */
        const animals = await client_1.default.animal.groupBy({
            by: ["groupId"],
            where: {
                userId,
                groupId: { in: MILKING_GROUPS },
            },
            _count: { id: true },
        });
        const animalCount = {};
        animals.forEach((a) => {
            animalCount[a.groupId] = a._count.id;
        });
        /* -----------------------------
           Milk data (date-wise)
        ------------------------------ */
        const milkRows = await client_1.default.milk.groupBy({
            by: ["date", "groupId"],
            where: {
                date: { gte: fromDate, lte: toDate },
                groupId: { in: MILKING_GROUPS },
            },
            _sum: { milkLit: true },
        });
        /* -----------------------------
           Build date-wise report
        ------------------------------ */
        const report = {};
        milkRows.forEach((m) => {
            const dateKey = m.date.toISOString().split("T")[0];
            if (!report[dateKey])
                report[dateKey] = {};
            report[dateKey][m.groupId] =
                (m._sum.milkLit || 0) / (animalCount[m.groupId] || 1);
        });
        /* -----------------------------
           Final rows (all 7 days)
        ------------------------------ */
        const result = [];
        for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toISOString().split("T")[0];
            const row = { date: dateKey };
            MILKING_GROUPS.forEach((g) => {
                row[`group${g}`] = Number((report[dateKey]?.[g] || 0).toFixed(1));
            });
            result.push(row);
        }
        /* -----------------------------
           7 Day Average
        ------------------------------ */
        const avgRow = { date: "7 Day Avg" };
        MILKING_GROUPS.forEach((g) => {
            const sum = result.reduce((t, r) => t + r[`group${g}`], 0);
            avgRow[`group${g}`] = Number((sum / result.length).toFixed(1));
        });
        result.push(avgRow);
        res.json({
            from: fromDate.toISOString().split("T")[0],
            to: toDate.toISOString().split("T")[0],
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Report failed" });
    }
};
exports.groupWiseDailyMilkAvgReport = groupWiseDailyMilkAvgReport;
