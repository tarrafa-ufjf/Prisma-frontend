interface SuggestionBoxProps {
    text: string;
    onClick: (text: string) => void;
}

export default function SuggestionBox({
    text,
    onClick
}: SuggestionBoxProps) {

    return (

        <button
            onClick={() => onClick(text)}
            className="
                w-full
                min-h-[88px]
                rounded-[28px]
                border
                border-[#F0F1F6]
                bg-[#F8F8FC]
                px-6
                py-5
                text-left
                text-[15px]
                leading-6
                text-[#6E6E87]
                transition-all
                duration-200
                hover:bg-[#F4F5FA]
            "
        >

            {text}

        </button>

    );
}