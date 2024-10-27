"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitForm = void 0;
const zod_1 = require("zod");
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
    console.log('Form submission hit');
    // Start performance logging
    console.time('Form Submission Time');
    const parsedStudentData = await studentSchema.safeParseAsync(studentData);
    if (!parsedStudentData.success) {
        console.timeEnd('Form Submission Time');
        return res.status(400).json({
            error: 'Validation failed',
            details: parsedStudentData.error.errors,
        });
    }
    try {
        console.time('Check Existing Student Time');
        const existingStudent = await db_1.default.student.findUnique({
            where: { email: parsedStudentData.data.email },
        });
        console.timeEnd('Check Existing Student Time');
        if (existingStudent) {
            console.timeEnd('Form Submission Time');
            return res.status(409).json({
                error: 'Registration failed',
                details: 'Email already registered.',
            });
        }
        console.time('Create New Student Time');
        const newStudent = await db_1.default.student.create({
            data: parsedStudentData.data,
        });
        console.timeEnd('Create New Student Time');
        // await emailQueue.add({ email: newStudent.email });
        console.timeEnd('Form Submission Time');
        return res.status(200).json({
            message: 'Data submitted successfully!',
            student: newStudent,
        });
    }
    catch (err) {
        console.error('Error while submitting form:', err);
        console.timeEnd('Form Submission Time');
        return res.status(500).json({
            error: 'Database error',
            details: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};
exports.submitForm = submitForm;
