import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@/components/theme-provider';
import axios from 'axios';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './components/ui/select';
import { Progress } from '@/components/ui/progress';
import SessionHeader from './SessionHeader';
import AlertMessage from './AlertMesssage';
import sdcImage from './2.png';
const apiUrl = 'https://sdc-forms-backend.onrender.com/api';
import GitHubCard from './GitHubCard';
const studentSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	year: z.enum(['ONE', 'TWO', 'THREE', 'FOUR']),
	branch: z.enum(['CSE', 'ECE', 'EEE', 'AIML', 'AIDS', 'CSD', 'ME', 'IT', 'CIVIL']),
	section: z.string().length(1, 'Section must be a single character'),
	phoneNumber: z.string().length(10, 'Phone number must be exactly 10 digits').regex(/^\d+$/, 'Phone number must contain only digits'),
	email: z.string().email('Invalid email address'),
});

type StudentFormData = z.infer<typeof studentSchema>;

const Form: React.FC = () => {
	const { theme } = useTheme();
	const isDarkMode = theme === 'dark';
	const [alert, setAlert] = useState<{ title: string; description: string; variant?: 'default' | 'destructive' } | null>(null);
	const [progress, setProgress] = useState<number | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<StudentFormData>({
		resolver: zodResolver(studentSchema),
	});
	console.log(apiUrl);
	const onSubmit = async (data: StudentFormData) => {
		setProgress(0);
		console.log(data);
		const payload = { studentData: data };
		let interval;

		try {
			interval = setInterval(() => {
				setProgress((prev) => (prev !== null && prev < 100 ? prev + 20 : 100));
			}, 500);

			const response = await axios.post(`${apiUrl}/submit-form`, payload);
			clearInterval(interval);

			if (response.status === 200) {
				console.log('Form submitted successfully:', data);
				setAlert({ title: 'Registration Successful!', description: 'Please check your email for confirmation, including your spam folder.' });
			} else {
				setAlert({ title: 'Registration Failed!', description: 'An error occurred. Please try again later.', variant: 'destructive' });
			}
		} catch (error) {
			clearInterval(interval);
			if (axios.isAxiosError(error) && error.response) {
				console.error('Error submitting form:', error.response.data);
				setAlert({ title: 'Registration Failed!', description: error.response.data.message || 'Please enter valid data.', variant: 'destructive' });
			} else {
				setAlert({ title: 'Registration Failed!', description: 'Please check your network connection.', variant: 'destructive' });
				console.error('Error submitting form:', error);
			}
		}
	};

	return (
		<div
			className={`flex justify-center flex-col items-center min-h-screen ${
				isDarkMode ? 'dark' : 'light'
			} transition duration-300  dark:bg-stone-950 light:bg-white rounded-sm border-2 border-stone-200`}
		>
			{alert && (
				<div className="absolute top-20 right-4">
					<AlertMessage title={alert.title} description={alert.description} variant={alert.variant} />
				</div>
			)}

			{progress !== null && progress < 100 && (
				<div className="absolute top-20 right-4 w-[20%]">
					<Progress value={progress} />
				</div>
			)}

			<form onSubmit={handleSubmit(onSubmit)} className={`form ${isDarkMode ? 'dark' : 'light'} bg-[var(--bg-color)] `}>
				<SessionHeader logoSrc={sdcImage} title="Session Registration" />
				<div className="mb-4">
					<Label className="text-[var(--text-color)] font-bold text-lg">First Name</Label>
					<Input {...register('firstName')} placeholder="Eg: Ravi" className={`text-sm text-[var(--text-color)] ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`} />
					{errors.firstName && <p className="mt-1 text-red-500 text-xs italic">{errors.firstName.message}</p>}
				</div>

				<div className="mb-4">
					<Label className="text-[var(--text-color)] font-bold text-lg">Last Name</Label>
					<Input {...register('lastName')} placeholder="Eg: Kumar" className={`text-sm text-[var(--text-color)] ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`} />
					{errors.lastName && <p className="mt-1 text-red-500 text-xs italic">{errors.lastName.message}</p>}
				</div>

				<div className="mb-4">
					<Label className="text-[var(--text-color)] font-bold text-lg">Year</Label>
					<Select onValueChange={(value: 'ONE' | 'TWO' | 'THREE' | 'FOUR') => setValue('year', value)}>
						<SelectTrigger className={`text-sm text-[var(--text-color)] ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
							<SelectValue placeholder="Select Year" />
						</SelectTrigger>
						<SelectContent className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} text-[var(--text-color)]`}>
							{['ONE', 'TWO', 'THREE', 'FOUR'].map((year) => (
								<SelectItem key={year} value={year} className={`text-sm ${isDarkMode ? 'text-stone-300 hover:bg-gray-700' : 'text-black hover:bg-gray-200'}`}>
									{year}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.year && <p className="mt-1 text-red-500 text-xs italic">{errors.year.message}</p>}
				</div>

				<div className="mb-4">
					<Label className="text-[var(--text-color)] font-bold text-lg">Branch</Label>
					<Select onValueChange={(value: 'CSE' | 'ECE' | 'EEE' | 'AIML' | 'AIDS' | 'CSD' | 'ME' | 'IT' | 'CIVIL') => setValue('branch', value)}>
						<SelectTrigger className={`text-sm text-[var(--text-color)] ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
							<SelectValue placeholder="Select Branch" />
						</SelectTrigger>
						<SelectContent className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} text-[var(--text-color)]`}>
							{['CSE', 'ECE', 'EEE', 'AIML', 'AIDS', 'CSD', 'ME', 'IT', 'CIVIL'].map((branch) => (
								<SelectItem key={branch} value={branch} className={`text-sm ${isDarkMode ? 'text-stone-300 hover:bg-gray-700' : 'text-black hover:bg-gray-200'}`}>
									{branch}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.branch && <p className="mt-1 text-red-500 text-xs italic">{errors.branch.message}</p>}
				</div>

				<div className="mb-4">
					<Label className="text-[var(--text-color)] font-bold text-lg">Section</Label>
					<Input
						{...register('section')}
						placeholder="Eg: A | B | C ..."
						className={`text-sm text-[var(--text-color)] ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
					/>
					{errors.section && <p className="mt-1 text-red-500 text-xs italic">{errors.section.message}</p>}
				</div>

				<div className="mb-4">
					<Label className="text-[var(--text-color)] font-bold text-lg">Phone Number</Label>
					<Input
						{...register('phoneNumber')}
						placeholder="Eg: 9811111111"
						className={`text-sm text-[var(--text-color)] ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
					/>
					{errors.phoneNumber && <p className="mt-1 text-red-500 text-xs italic">{errors.phoneNumber.message}</p>}
				</div>

				<div className="mb-4">
					<Label className="text-[var(--text-color)] font-bold text-lg">Email</Label>
					<Input
						{...register('email')}
						placeholder="john.doe@gmail.com"
						className={`text-sm text-[var(--text-color)] ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
					/>
					{errors.email && <p className="mt-1 text-red-500 text-xs italic">{errors.email.message}</p>}
				</div>

				<Button type="submit" className="button w-full mt-4">
					Submit
				</Button>
			</form>
			<div className="mt-4 w-full flex justify-center">
				<GitHubCard />
			</div>
		</div>
	);
};

export default Form;
