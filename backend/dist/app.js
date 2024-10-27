"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const route_1 = __importDefault(require("./route"));
const healthRoute_1 = __importDefault(require("./healthRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://sdc-forms.vercel.app', 'https://sdc-forms-git-main-fyzanshaiks-projects.vercel.app', 'https://sdc-forms-86wal909i-fyzanshaiks-projects.vercel.app'],
}));
app.use(express_1.default.json());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 50,
});
app.use(limiter);
app.get('/', healthRoute_1.default);
app.use('/api', route_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on PORT 8080`);
});
