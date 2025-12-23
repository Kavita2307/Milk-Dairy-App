"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const milk_controller_1 = require("../controllers/milk.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.requireAuth, milk_controller_1.saveMilk);
router.get("/loadcell/read", auth_1.requireAuth, milk_controller_1.readMilkLoadCell);
exports.default = router;
