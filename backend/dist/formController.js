"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitForm = void 0;
const zod_1 = require("zod");
const mail_1 = __importDefault(require("./mail"));
const db_1 = __importDefault(require("./db"));
const studentSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    year: zod_1.z.enum(['ONE', 'TWO', 'THREE', 'FOUR']),
    branch: zod_1.z.enum(['CSE', 'ECE', 'EEE', 'AIML', 'AIDS', 'CSD', 'ME']),
    section: zod_1.z.string().length(1, 'Section must be a single character'),
    phoneNumber: zod_1.z.string().length(10, 'Phone number must be exactly 10 digits').regex(/^\d+$/, 'Phone number must contain only digits'),
    email: zod_1.z.string().email('Invalid email address'),
});
let count = 0;
const submitForm = async (req, res) => {
    const { studentData } = req.body;
    console.log('hit: ', count++);
    const parsedStudentData = await studentSchema.safeParseAsync(studentData);
    if (!parsedStudentData.success) {
        return res.status(400).json({
            error: 'Validation failed',
            details: parsedStudentData.error.errors,
        });
    }
    try {
        const newStudent = await db_1.default.student.create({
            data: parsedStudentData.data,
        });
        await (0, mail_1.default)(newStudent.email);
        return res.status(201).json({
            message: 'Data submitted successfully!',
            student: newStudent,
        });
    }
    catch (err) {
        return res.status(500).json({
            error: 'Database error',
            details: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};
exports.submitForm = submitForm;
