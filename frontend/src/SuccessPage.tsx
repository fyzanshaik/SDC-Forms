import React from 'react';
import { Button } from './components/ui/button';
import { useToast } from './ToastContext';
import { useTheme } from '@/components/theme-provider';

const SuccessPage: React.FC = () => {
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

	const shareLink = async () => {
		const url = window.location.origin;
		if (navigator.share) {
			try {
				await navigator.share({
					title: 'Check out this awesome event!',
					url: url,
				});
				showToast('Shared successfully!');
			} catch (err) {
				console.error('Error sharing:', err);
				showToast('Failed to share!');
			}
		} else {
			copyToClipboard(url);
		}
	};

	const starsCount = 200;
	const meteorsCount = 15;

	const eventDetails = {
		name: 'Git & GitHub Workshop',
		venue: 'SAC Room',
		time: '1:30 PM',
	};

	const handleBackToHome = () => {
		window.location.href = '/';
	};

	return (
		<div
			className={`relative flex no-scrollbar overflow-hidden overflow-y-hidden justify-center flex-col items-center min-h-screen pt-7 transition duration-300 ${
				isDarkMode ? 'dark:text-white' : 'text-gray-800'
			}`}
		>
			<div className="stars no-scrollbar ">
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
				<h1 className="text-3xl font-bold">Registration Successful!</h1>
				<p className="text-lg">
					Thank you for registering! For future updates, join our WhatsApp group & check your <strong>SPAM folder</strong> for an email :
				</p>

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

				<div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">{eventDetails.name}</h2>
					<p className="text-md">Venue: {eventDetails.venue}</p>
					<p className="text-md">Time: {eventDetails.time}</p>
				</div>

				<Button onClick={shareLink} className="mt-4" variant="outline">
					Share with Friends
				</Button>

				<Button onClick={handleBackToHome} className="mt-4" variant="outline">
					Back to Home
				</Button>

				<p className="text-sm text-gray-500">You can access the links above to stay connected with us.</p>
			</div>
		</div>
	);
};

export default SuccessPage;
