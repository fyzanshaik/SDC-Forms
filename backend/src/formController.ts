import { Request, Response } from 'express';
import { z } from 'zod';
import sendMail from './mail';
import prisma from './db';

const studentSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	year: z.enum(['ONE', 'TWO', 'THREE', 'FOUR']),
	branch: z.enum(['CSE', 'ECE', 'EEE', 'AIML', 'AIDS', 'CSD', 'ME']),
	section: z.string().length(1, 'Section must be a single character'),
	phoneNumber: z.string().length(10, 'Phone number must be exactly 10 digits').regex(/^\d+$/, 'Phone number must contain only digits'),
	email: z.string().email('Invalid email address'),
});

type StudentData = z.infer<typeof studentSchema>;
let count = 0;
interface UserStudentFormBody {
	studentData: StudentData;
}
export const submitForm = async (req: Request, res: Response) => {
	const { studentData } = req.body as UserStudentFormBody;
	console.log('hit: ', count++);
	const parsedStudentData = await studentSchema.safeParseAsync(studentData);

	if (!parsedStudentData.success) {
		return res.status(400).json({
			error: 'Validation failed',
			details: parsedStudentData.error.errors,
		});
	}

	try {
		const newStudent = await prisma.student.create({
			data: parsedStudentData.data,
		});
		await sendMail(newStudent.email);

		return res.status(201).json({
			message: 'Data submitted successfully!',
			student: newStudent,
		});
	} catch (err) {
		return res.status(500).json({
			error: 'Database error',
			details: err instanceof Error ? err.message : 'Unknown error',
		});
	}
};
