"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthController_1 = require("./healthController");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    await (0, healthController_1.healthCheck)(req, res);
});
exports.default = router;
