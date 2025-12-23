"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const SALT_ROUNDS = 10;
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const existing = await client_1.default.user.findUnique({ where: { email } });
        if (existing)
            return res.status(400).json({ error: "Email already registered" });
        console.log("come to backend");
        console.log("backend email: ", email, password, name);
        const hash = await bcrypt_1.default.hash(password, SALT_ROUNDS);
        const user = await client_1.default.user.create({
            data: { email, password: hash, name },
        });
        const token = (0, jwt_1.signJwt)({ userId: user.id, email: user.email });
        res.json({
            user: { id: user.id, email: user.email, name: user.name },
            token,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Registration failed" });
    }
};
exports.register = register;
const login = async (req, res) => {
    console.log("inside login of auth controller");
    try {
        const { email, password } = req.body;
        console.log("login backend email: ", email, password);
        const user = await client_1.default.user.findUnique({ where: { email } });
        console.log("user: ", user);
        if (!user)
            return res.status(401).json({ error: "Invalid credentials" });
        const ok = (await password) === user.password;
        // const ok = await bcrypt.compare(password, user.password);
        console.log("ok: ", ok);
        if (!ok)
            return res.status(401).json({ error: "Invalid credentials" });
        const token = (0, jwt_1.signJwt)({ userId: user.id, email: user.email });
        console.log("token: ", token);
        res.json({
            user: { id: user.id, email: user.email, name: user.name },
            token,
            userId: user.id,
        });
        console.log("login successfully......");
        // return user.id;
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login failed" });
    }
};
exports.login = login;
