import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { submitForm } from './formController';
import { healthCheck } from './healthController';
const router = Router();

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

interface UserStudentFormBody {
	studentData: StudentData;
}

router.post<{}, {}, UserStudentFormBody>('/submit-form', async (req: Request<{}, {}, UserStudentFormBody>, res: Response) => {
	await submitForm(req, res);
});

export default router;
