"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_1 = require("../controllers/analytics.controller");
const router = (0, express_1.Router)();
// router.get("/herd-summary", herdSummary);
router.get("/milk/group/:groupId/last7", analytics_controller_1.milkLast7Days);
router.get("/leftover/by-group", analytics_controller_1.leftoverByGroup);
exports.default = router;
