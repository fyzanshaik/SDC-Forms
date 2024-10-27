import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast, ToastProvider, ToastViewport, ToastTitle } from './components/ui/toast'; // Adjust the path

interface ToastContextType {
	showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProviderWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
	let toastId = 0;

	const showToast = (message: string) => {
		toastId += 1;
		setToasts((prev) => [...prev, { id: toastId, message }]);

		setTimeout(() => {
			setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
		}, 3000);
	};

	const value = { showToast };

	return (
		<ToastProvider>
			<ToastContext.Provider value={value}>
				{children}
				<ToastViewport>
					{toasts.map((toast) => (
						<Toast key={toast.id}>
							<ToastTitle>{toast.message}</ToastTitle>
						</Toast>
					))}
				</ToastViewport>
			</ToastContext.Provider>
		</ToastProvider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within a ToastProviderWrapper');
	}
	return context;
};
