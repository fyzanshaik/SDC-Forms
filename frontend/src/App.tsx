import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Header from './Header';
import Form from './Form';
import Loader from './Loader';
import axios from 'axios';
import './styles.css';

const App: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [serverUp, setServerUp] = useState(false);

	const checkServer = async () => {
		try {
			const response = await axios.get('https://sdc-forms-backend.onrender.com/'); // Replace with your endpoint
			if (response.data.message) {
				setServerUp(true);
			}
		} catch (error) {
			console.error('Server check failed:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		checkServer();
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<div className="">
				<Header />
				{serverUp ? <Form /> : <p className="text-red-500">Server is down. Please wait.</p>}
			</div>
		</ThemeProvider>
	);
};

export default App;
