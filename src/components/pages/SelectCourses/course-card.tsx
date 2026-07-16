import { Curso } from "@/types/curso";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface CourseCardProps {
    course: Curso
    path: string
}

export default function CourseCard({ course, path }: CourseCardProps) {
    const t = useTranslations("SelectCourses");
    const isProcessed = course.status === "D";

    const cardClasses = isProcessed
        ? "relative w-full bg-[#5a6acf] text-white hover:bg-[#374DAA] hover:scale-105 transition-all flex flex-col rounded-xl border border-gray-300 h-24 p-3"
        : "relative w-full bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 transition-all flex flex-col rounded-xl border border-gray-300 h-24 p-3 pr-37";


    return (
        <Link href={`${path}${course.id}`} className={cardClasses}>
            {!isProcessed && (
                <span className="absolute top-2 right-2 text-xs font-semibold bg-gray-300 text-gray-700 px-2 py-0.5 rounded-full">
                    {t("processing")}
                </span>
            )}

            <h1 className="font-medium line-clamp-2" title={course.fullname}>{course.fullname}</h1>
            <p className="text-sm opacity-80 mt-auto">
                {course.shortname} - {course.period?.replace(/^(\d{4})\.(\d{1,2})$/, (_, y, m) => `${m.padStart(2,'0')}/${y}`) ?? ''}
            </p>
        </Link>
    );
};
