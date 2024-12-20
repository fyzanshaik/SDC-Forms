import { ModeToggle } from '@/components/mode-toggle';
import { Button } from './components/ui/button';
import { useTheme } from '@/components/theme-provider';
import githubLogoDark from './git1.png';
import githubLogoLight from './git2.svg';

const Header = () => {
	const { theme } = useTheme();

	const handleGitHubClick = () => {
		window.location.href = 'https://github.com/fyzanshaik/SDC-Forms';
	};

	return (
		<header className="w-full p-2 sm:p-4 flex justify-between items-center bg-gray-200 dark:bg-stone-950 dark:text-white">
			<div className="flex items-center space-x-2">
				<Button size="icon" variant="outline" onClick={handleGitHubClick}>
					<img src={theme === 'dark' ? githubLogoDark : githubLogoLight} alt="GitHub Logo" className="h-6 w-6 sm:h-8 sm:w-8" />
				</Button>
				<ModeToggle />
			</div>
			<h1 className="text-lg sm:text-sm md:text-xl font-semibold">Student Developers Club</h1>
		</header>
	);
};

export default Header;
