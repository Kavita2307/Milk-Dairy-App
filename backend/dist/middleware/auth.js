"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const requireAuth = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header)
            return res.status(401).json({ error: "No token" });
        const token = header.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId, email }
        next();
    }
    catch {
        res.status(401).json({ error: "Invalid token" });
    }
};
exports.requireAuth = requireAuth;
