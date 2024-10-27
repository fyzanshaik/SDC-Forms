"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = __importDefault(require("bull"));
const mail_1 = __importDefault(require("./mail"));
const emailQueue = new bull_1.default('emailQueue');
emailQueue.process(async (job) => {
    const emailProcessTimeStart = performance.now();
    await (0, mail_1.default)(job.data.email);
    const endTime = performance.now();
    console.log(`It took this long for it process the email: ${endTime - emailProcessTimeStart}`);
});
exports.default = emailQueue;
