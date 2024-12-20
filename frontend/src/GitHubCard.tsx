import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

import githubLogoDark from './git1.png';
import githubLogoLight from './git2.svg';
const GitHubCard: React.FC = () => {
	const { theme } = useTheme();

	const handleGitHubClick = () => {
		window.location.href = import.meta.env.VITE_GITHUB_URL;
	};

	return (
		<Card className="w-[350px] mx-auto mt-4">
			<CardHeader>
				<CardTitle>Need Help?</CardTitle>
				<CardDescription>Want to check out the code or find any issues you want to report in this form?</CardDescription>
			</CardHeader>
			<CardContent className="flex items-center">
				<Button variant="outline" onClick={handleGitHubClick} className="flex items-center">
					<img src={theme === 'dark' ? githubLogoDark : githubLogoLight} alt="GitHub Logo" className="h-6 w-6 mr-2" />
					View on GitHub
				</Button>
			</CardContent>
		</Card>
	);
};

export default GitHubCard;
