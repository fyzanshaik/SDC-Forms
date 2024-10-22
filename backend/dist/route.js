"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const formController_1 = require("./formController");
const router = (0, express_1.Router)();
const studentSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    year: zod_1.z.enum(['ONE', 'TWO', 'THREE', 'FOUR']),
    branch: zod_1.z.enum(['CSE', 'ECE', 'EEE', 'AIML', 'AIDS', 'CSD', 'ME', 'IT', 'CIVIL']),
    section: zod_1.z.string().length(1, 'Section must be a single character'),
    phoneNumber: zod_1.z.string().length(10, 'Phone number must be exactly 10 digits').regex(/^\d+$/, 'Phone number must contain only digits'),
    email: zod_1.z.string().email('Invalid email address'),
});
router.post('/submit-form', async (req, res) => {
    await (0, formController_1.submitForm)(req, res);
});
exports.default = router;
