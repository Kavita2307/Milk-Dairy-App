"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const animal_routes_1 = __importDefault(require("./routes/animal.routes"));
const ration_routes_1 = __importDefault(require("./routes/ration.routes"));
const leftover_routes_1 = __importDefault(require("./routes/leftover.routes"));
const milk_routes_1 = __importDefault(require("./routes/milk.routes"));
const ingredient_routes_1 = __importDefault(require("./routes/ingredient.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const report_routes_1 = __importDefault(require("./routes/report.routes"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
const mix_routes_1 = __importDefault(require("./routes/mix.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.get("/", (_req, res) => res.send({ status: "ok" }));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/profile", profile_routes_1.default);
app.use("/api/animals", animal_routes_1.default);
app.use("/api/ration", ration_routes_1.default);
app.use("/api/leftover", leftover_routes_1.default);
app.use("/api/mix", mix_routes_1.default);
app.use("/api/milk", milk_routes_1.default);
app.use("/api/ingredients", ingredient_routes_1.default);
app.use("/api/analytics", analytics_routes_1.default);
app.use("/api/report", report_routes_1.default);
exports.default = app;
