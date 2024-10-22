"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://sdc-forms.vercel.app', 'https://sdc-forms-git-main-fyzanshaiks-projects.vercel.app', 'https://sdc-forms-86wal909i-fyzanshaiks-projects.vercel.app'],
}));
app.use(express_1.default.json());
app.use('/api', route_1.default);
app.listen(8080, () => {
    console.log(`Server is running on PORT 8080`);
});
