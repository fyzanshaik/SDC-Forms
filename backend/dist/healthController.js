"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const healthCheck = async (req, res) => {
    res.json({ message: 'Working!' });
};
exports.healthCheck = healthCheck;
