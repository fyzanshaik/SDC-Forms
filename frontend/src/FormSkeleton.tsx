import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const FormSkeleton: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<div className="flex flex-col items-center w-full mb-4">
				<Skeleton className="h-12 w-[250px] rounded-full mb-2" />
				<Skeleton className="h-6 w-[200px] rounded-md" />
			</div>

			<form className="w-full max-w-md space-y-4">
				<div>
					<Skeleton className="h-4 w-full rounded-md" />
				</div>
				<div>
					<Skeleton className="h-4 w-full rounded-md" />
				</div>
				<div>
					<Skeleton className="h-4 w-full rounded-md" />
				</div>
				<div>
					<Skeleton className="h-4 w-full rounded-md" />
				</div>
				<div>
					<Skeleton className="h-4 w-full rounded-md" />
				</div>
				<div>
					<Skeleton className="h-4 w-full rounded-md" />
				</div>
				<div>
					<Skeleton className="h-4 w-full rounded-md" />
				</div>
				<Skeleton className="h-10 w-full rounded-md" />
			</form>
		</div>
	);
};

export default FormSkeleton;
