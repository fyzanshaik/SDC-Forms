import { Request, Response } from 'express';
import { z } from 'zod';
import emailQueue from './queue';
import prisma from './db';

const studentSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	year: z.enum(['ONE', 'TWO', 'THREE', 'FOUR']),
	branch: z.enum(['CSE', 'ECE', 'EEE', 'AIML', 'AIDS', 'CSD', 'ME', 'IT', 'CIVIL']),
	section: z.string().length(1, 'Section must be a single character'),
	phoneNumber: z.string().length(10, 'Phone number must be exactly 10 digits').regex(/^\d+$/, 'Phone number must contain only digits'),
	email: z.string().email('Invalid email address'),
});

type StudentData = z.infer<typeof studentSchema>;

interface UserStudentFormBody {
	studentData: StudentData;
}

export const submitForm = async (req: Request, res: Response) => {
	const { studentData } = req.body as UserStudentFormBody;
	console.log('Form controller hit!');
	const parsedStudentData = await studentSchema.safeParseAsync(studentData);

	if (!parsedStudentData.success) {
		return res.status(400).json({
			error: 'Validation failed',
			details: parsedStudentData.error.errors,
		});
	}

	try {
		const existingStudent = await prisma.student.findUnique({
			where: { email: parsedStudentData.data.email },
		});

		if (existingStudent) {
			return res.status(409).json({
				error: 'Registration failed',
				details: 'Email already registered.',
			});
		}

		const newStudent = await prisma.student.create({
			data: parsedStudentData.data,
		});

		res.status(200).json({
			message: 'Data submitted successfully!',
			student: newStudent,
		});

		// emailQueue.add({ email: newStudent.email });
	} catch (err) {
		console.error('Error while submitting form:', err);
		console.timeEnd('Form Submission Time');
		return res.status(500).json({
			error: 'Database error',
			details: err instanceof Error ? err.message : 'Unknown error',
		});
	}
};
