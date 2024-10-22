import { ModeToggle } from '@/components/mode-toggle';
import { Button } from './components/ui/button';
import { useTheme } from '@/components/theme-provider'; // Import the useTheme hook
import githubLogoDark from '../public/git1.png'; // Dark mode logo
import githubLogoLight from '../public/git2.svg'; // Light mode logo (add this image)

const Header = () => {
	const { theme } = useTheme(); // Get the current theme

	const handleGitHubClick = () => {
		window.location.href = 'https://github.com/fyzanshaik/SDC-Forms'; // Replace with your GitHub URL
	};

	return (
		<header className="w-full p-4 flex justify-between items-center bg-gray-200 dark:bg-stone-950 dark:text-white">
			<div className="flex items-center space-x-2">
				<Button size="icon" variant="outline" onClick={handleGitHubClick}>
					<img
						src={theme === 'dark' ? githubLogoDark : githubLogoLight} // Conditionally render the logo based on theme
						alt="GitHub Logo"
						className="h-8 w-8" // Adjust size here
					/>
				</Button>
				<ModeToggle />
			</div>
			<h1 className="text-xl">Student Developers Club</h1>
		</header>
	);
};

export default Header;
