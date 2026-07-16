import { TriangleAlert } from 'lucide-react';

interface ErrorMessageProps {
    children: React.ReactNode
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
    return (
        <div className="flex justify-center items-center w-fit rounded text-red-600 text-2xl border-2 border-red-800 p-2.5 gap-1.5">
            <TriangleAlert />
            {children}
        </div>
    );
};
