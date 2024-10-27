"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const keepAliveInterval = setInterval(async () => {
    try {
        await prisma.$executeRaw `SELECT 1;`;
    }
    catch (error) {
        console.error('Error keeping connection alive:', error);
    }
}, 240000);
const cleanup = async () => {
    clearInterval(keepAliveInterval);
    await prisma.$disconnect();
};
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
exports.default = prisma;
