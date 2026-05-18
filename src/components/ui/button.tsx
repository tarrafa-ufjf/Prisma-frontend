import Link from "next/link";

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function Button({
    children,
    href,
    onClick,
    disabled = false,
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
            disabled={disabled}
            className={`
                px-4 py-2 rounded text-white transition
                ${disabled
                    ? "bg-gray-400 cursor-not-allowed opacity-80"
                    : "bg-[#5a6acf] hover:bg-[#374DAA]"
                }
            `}
        >
            {children}
        </button>
    );
}