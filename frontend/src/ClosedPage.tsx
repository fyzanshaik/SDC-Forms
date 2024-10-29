import React from 'react';
import { Button } from './components/ui/button';
import { useToast } from './ToastContext';
import { useTheme } from '@/components/theme-provider';

const ClosedPage: React.FC = () => {
	const { showToast } = useToast();
	const { theme } = useTheme();
	const isDarkMode = theme === 'dark';

	const whatsappLinks = [
		{ label: 'Join Our WhatsApp Group 1', url: 'https://chat.whatsapp.com/FPxwdBgNjFx7LZpJKHJ2l6' },
		{ label: 'Join Our WhatsApp Group 2', url: 'https://chat.whatsapp.com/JXNGAY3g61X6scYU6UDNBy' },
	];

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			showToast('Copied to clipboard!');
		} catch (err) {
			console.error('Failed to copy: ', err);
			showToast('Failed to copy!');
		}
	};

	const starsCount = 200;
	const meteorsCount = 15;

	return (
		<div
			className={`relative flex no-scrollbar overflow-hidden overflow-y-hidden justify-center flex-col items-center min-h-screen pt-7 transition duration-300 ${
				isDarkMode ? 'dark:text-white' : 'text-gray-800'
			}`}
		>
			<div className="stars no-scrollbar">
				{Array.from({ length: starsCount }).map((_, index) => (
					<div
						key={index}
						className="star"
						style={{
							width: `${Math.random() * 4 + 1}px`,
							height: `${Math.random() * 4 + 1}px`,
							top: `${Math.random() * 100}vh`,
							left: `${Math.random() * 100}vw`,
							animationDuration: `${Math.random() * 2 + 1}s`,
						}}
					/>
				))}
			</div>

			{Array.from({ length: meteorsCount }).map((_, index) => (
				<div
					key={index}
					className="meteor"
					style={{
						left: `${Math.random() * 100}vw`,
						animationDuration: `${Math.random() * 1 + 1}s`,
						animationDelay: `${Math.random() * 3}s`,
						transform: `translate(${Math.random() * 50 - 25}vw, ${Math.random() * 50}vh)`,
					}}
				/>
			))}

			<div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
				<h1 className="text-3xl font-bold">Registrations Closed!</h1>
				<p className="text-lg">We’re at full capacity. Thank you for your interest! To stay updated, join our WhatsApp groups below:</p>

				<div className="flex flex-col items-start space-y-2 mb-4">
					{whatsappLinks.map((link, index) => (
						<div key={index} className="flex items-center space-x-2">
							<Button asChild>
								<a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
									{link.label}
								</a>
							</Button>
							<Button onClick={() => copyToClipboard(link.url)} variant="outline" className="text-sm">
								Copy Link
							</Button>
						</div>
					))}
				</div>

				<p className="text-sm text-gray-500">We’ll keep you updated with the latest info on our WhatsApp groups.</p>
			</div>
		</div>
	);
};

export default ClosedPage;
