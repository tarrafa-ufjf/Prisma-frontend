
import React from 'react';

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
    children: React.ReactNode
}

export default function TableCell({ children, className = "", ...props }: TableCellProps) {
    return (
        <td className={`pl-2 h-16 items-center ${className}`} {...props}>
            {children}
        </td>
    );
};
