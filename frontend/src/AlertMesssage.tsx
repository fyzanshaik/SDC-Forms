// AlertMessage.tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AlertMessageProps {
	title: string;
	description: string;
	variant?: 'default' | 'destructive';
}

const AlertMessage: React.FC<AlertMessageProps> = ({ title, description, variant }) => {
	return (
		<Alert variant={variant}>
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription>{description}</AlertDescription>
		</Alert>
	);
};

export default AlertMessage;
