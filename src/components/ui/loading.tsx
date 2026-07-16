
interface LoadingProps {
    children: string
}

export default function Loading({ children }: LoadingProps) {
    return (
        <div className="flex flex-row justify-center gap-10 items-center">
            <p>{children}</p> <div className="loader"></div>
        </div>
    );
};
