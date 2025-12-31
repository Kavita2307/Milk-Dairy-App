"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const profile_controller_1 = require("../controllers/profile.controller");
const router = (0, express_1.Router)();
router.put("/", auth_1.requireAuth, profile_controller_1.updateProfile);
exports.default = router;
