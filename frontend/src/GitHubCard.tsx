import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import githubLogo from '../public/git1.png'; // Adjust the path as necessary

const GitHubCard: React.FC = () => {
	const handleGitHubClick = () => {
		window.location.href = 'https://github.com/fyzanshaik/SDC-Forms'; // Replace with your GitHub URL
	};

	return (
		<Card className="w-[350px] mx-auto mt-4">
			<CardHeader>
				<CardTitle>Need Help?</CardTitle>
				<CardDescription>Want to check out the code or find any issues you want to report in this form?</CardDescription>
			</CardHeader>
			<CardContent className="flex items-center">
				<Button variant="outline" onClick={handleGitHubClick} className="flex items-center">
					<img src={githubLogo} alt="GitHub Logo" className="h-6 w-6 mr-2" /> {/* Adjust size here */}
					View on GitHub
				</Button>
			</CardContent>
		</Card>
	);
};

export default GitHubCard;
