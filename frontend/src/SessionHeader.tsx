// SessionHeader.tsx

import React from 'react';

interface SessionHeaderProps {
	logoSrc: string;
	title: string;
}

const SessionHeader: React.FC<SessionHeaderProps> = ({ logoSrc, title }) => {
	return (
		<div className="flex items-center mb-6 session-header dark:text-stone-100">
			<img src={logoSrc} alt="SDC Logo" className="h-8 w-8 mr-2" />
			<h2 className="text-lg">{title}</h2>
		</div>
	);
};

export default SessionHeader;
