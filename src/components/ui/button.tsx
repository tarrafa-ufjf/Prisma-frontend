import Link from "next/link";

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
}

export default function Button({
    children,
    href,
    onClick,
}: ButtonProps) {

    if (href) {
        return (
            <Link
                href={href}
                className="px-4 py-2 rounded bg-[#5a6acf] text-white hover:bg-[#374DAA] transition"
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className="px-4 py-2 rounded bg-[#5a6acf] text-white hover:bg-[#374DAA] transition"
        >
            {children}
        </button>
    );
}