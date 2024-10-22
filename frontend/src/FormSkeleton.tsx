// FormSkeleton.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const FormSkeleton: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			{/* Header Skeleton */}
			<div className="flex flex-col items-center w-full mb-4">
				<Skeleton className="h-12 w-[250px] rounded-full mb-2" /> {/* Adjust width as needed */}
				<Skeleton className="h-6 w-[200px] rounded-md" /> {/* Title placeholder */}
			</div>

			{/* Form Fields Skeleton */}
			<form className="w-full max-w-md space-y-4">
				<div>
					<Skeleton className="h-4 w-full rounded-md" /> {/* First Name */}
				</div>
				<div>
					<Skeleton className="h-4 w-full rounded-md" /> {/* Last Name */}
				</div>
				<div>
					<Skeleton className="h-4 w-full rounded-md" /> {/* Year Select */}
				</div>
				<div>
					<Skeleton className="h-4 w-full rounded-md" /> {/* Branch Select */}
				</div>
				<div>
					<Skeleton className="h-4 w-full rounded-md" /> {/* Section Input */}
				</div>
				<div>
					<Skeleton className="h-4 w-full rounded-md" /> {/* Phone Number Input */}
				</div>
				<div>
					<Skeleton className="h-4 w-full rounded-md" /> {/* Email Input */}
				</div>
				<Skeleton className="h-10 w-full rounded-md" /> {/* Submit Button */}
			</form>
		</div>
	);
};

export default FormSkeleton;
