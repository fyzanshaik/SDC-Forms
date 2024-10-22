// Loader.tsx
import React from 'react';
import FormSkeleton from './FormSkeleton';

const Loader: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<p className="text-lg">Checking server status...</p>
			<FormSkeleton />
		</div>
	);
};

export default Loader;
