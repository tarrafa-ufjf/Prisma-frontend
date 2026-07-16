
interface TableCellProps {
    children: React.ReactNode
}

export default function TableRow({ children }: TableCellProps) {
    return (
        <tr className="odd:bg-[#dfe0e2] even:bg-[#f8f9fc] ">{children}</tr>
    );
};
