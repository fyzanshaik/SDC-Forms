"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitForm = void 0;
const zod_1 = require("zod");
const queue_1 = __importDefault(require("./queue"));
const db_1 = __importDefault(require("./db"));
const studentSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    year: zod_1.z.enum(['ONE', 'TWO', 'THREE', 'FOUR']),
    branch: zod_1.z.enum(['CSE', 'ECE', 'EEE', 'AIML', 'AIDS', 'CSD', 'ME', 'IT', 'CIVIL']),
    section: zod_1.z.string().length(1, 'Section must be a single character'),
    phoneNumber: zod_1.z.string().length(10, 'Phone number must be exactly 10 digits').regex(/^\d+$/, 'Phone number must contain only digits'),
    email: zod_1.z.string().email('Invalid email address'),
});
const submitForm = async (req, res) => {
    const { studentData } = req.body;
    const parsedStudentData = studentSchema.safeParse(studentData);
    if (!parsedStudentData.success) {
        return res.status(400).json({
            error: 'Validation failed',
            details: parsedStudentData.error.errors,
        });
    }
    const { email } = parsedStudentData.data;
    try {
        const result = await db_1.default.$transaction(async (prisma) => {
            const existingStudent = await prisma.student.findUnique({
                where: { email },
            });
            if (existingStudent) {
                throw new Error('Email already registered.');
            }
            return await prisma.student.create({
                data: parsedStudentData.data,
            });
        });
        await queue_1.default.add({ email });
        return res.status(200).json({
            message: 'Data submitted successfully!',
            student: result,
        });
    }
    catch (err) {
        const error = err;
        if (error.message === 'Email already registered.') {
            return res.status(409).json({
                error: 'Registration failed',
                details: error.message,
            });
        }
        console.error('Error while submitting form:', error);
        return res.status(500).json({
            error: 'Database error',
            details: error.message || 'Unknown error',
        });
    }
};
exports.submitForm = submitForm;
