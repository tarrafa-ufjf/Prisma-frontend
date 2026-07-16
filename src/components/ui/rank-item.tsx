import { LucideIcon, Search } from "lucide-react";
import Link from "next/link";

interface RankingItemProps {
    position: number,
    content: string,
    link: string,
    icon?: LucideIcon
}

export default function RankingItem({ position, content, link, icon = Search }: RankingItemProps) {
    const Icon = icon
    return (
        <div
            className="flex items-center justify-between px-6 py-5 bg-white shadow-sm rounded-md"
        >
            <span className="w-6 text-left font-medium text-gray-700">
                {position}
            </span>
            <span className="flex-1 text-left text-gray-800 truncate overflow-hidden whitespace-nowrap max-w-xs px-3" title={content}>{content}</span>
            <button className="text-gray-700 cursor-pointer hover:text-gray-900">
                <Link
                    href={link}
                >
                    <Icon className='text-2xl text-gray-700' />
                </Link>
            </button>
        </div>
    );
};