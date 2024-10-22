"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const healthCheck = async (req, res) => {
    console.log('Hit the health point');
    res.json({ message: 'Working!' });
};
exports.healthCheck = healthCheck;
