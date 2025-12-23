"use strict";
// import { Router } from "express";
// import {
//   addStock,
//   createIngredient,
//   getIngredient,
//   listIngredients,
//   recordConsumption,
// } from "../controllers/ingredient.controller";
// import { requireAuth } from "../middleware/auth";
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// router.get("/", requireAuth, listIngredients); // GET /ingredients
// router.post("/", requireAuth, createIngredient); // POST /ingredients
// router.get("/:id", requireAuth, getIngredient); // GET /ingredients/:id
// router.post("/:id/add-stock", requireAuth, addStock); // POST /ingredients/:id/add-stock
// router.post("/:id/consume", requireAuth, recordConsumption); // POST /ingredients/:id/consume
// export default router;
// src/routes/ingredient.routes.ts
const express_1 = require("express");
const ingredient_controller_1 = require("../controllers/ingredient.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.requireAuth, ingredient_controller_1.createIngredient);
router.get("/", auth_1.requireAuth, ingredient_controller_1.getIngredients);
router.get("/:id", auth_1.requireAuth, ingredient_controller_1.getIngredientById);
router.put("/:id", auth_1.requireAuth, ingredient_controller_1.updateIngredient);
//router.post("/add-stock", addStock);
router.post("/:ingredientId/add-stock", auth_1.requireAuth, ingredient_controller_1.addStock);
exports.default = router;
