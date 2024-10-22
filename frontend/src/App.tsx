import { ThemeProvider } from '@/components/theme-provider';
import Header from './Header';
import Form from './Form';
import './styles.css';

const App = () => {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<div className="">
				<Header />
				<Form />
			</div>
		</ThemeProvider>
	);
};

export default App;
