import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Header from './Header';
// import Form from './Form';
import Loader from './Loader';
import ClosedPage from './ClosedPage';
import SuccessPage from './SuccessPage'; // Create this component
import { ToastProviderWrapper } from './ToastContext'; // Adjust the path
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components from react-router
import { prodApi } from './serverURL';
import axios from 'axios';
import './styles.css';

const App: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [serverUp, setServerUp] = useState(false);

	const checkServer = async () => {
		try {
			console.log(serverUp);
			const response = await axios.get(prodApi);
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
	});

	if (loading) {
		return <Loader />;
	}

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<ToastProviderWrapper>
				<Router>
					<div>
						<Header />
						<Routes>
							{/* <Route path="/" element={serverUp ? <Form /> : <p className="text-red-500">Server is down. Please wait & reload the page again.</p>} /> */}
							<Route path="/" element={<ClosedPage />}></Route>
							<Route path="/success" element={<SuccessPage />} />
						</Routes>
					</div>
				</Router>
			</ToastProviderWrapper>
		</ThemeProvider>
	);
};

export default App;
