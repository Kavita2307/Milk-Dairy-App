"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leftover_controller_1 = require("../controllers/leftover.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Read from load cell
router.get("/loadcell/read", auth_1.requireAuth, leftover_controller_1.readLoadCell);
// Save leftover
router.post("/", auth_1.requireAuth, leftover_controller_1.saveLeftover);
// List leftover history for a group
router.get("/:groupId", auth_1.requireAuth, leftover_controller_1.getLeftoverHistory);
exports.default = router;
