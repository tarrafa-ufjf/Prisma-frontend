
interface TableHeaderProps {
    children: string
}

export default function TableHeader({ children }: TableHeaderProps) {
    return (
        <th className="text-center bg-[#f8f9fc] pl-2 h-16">{children}</th>
    );
};
