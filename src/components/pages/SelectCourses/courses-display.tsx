import { Curso } from "@/types/curso";
import CourseCard from "./course-card";
import SearchInput from "@/components/template/searchInput";
import Pagination from "@/components/template/pagination";
import { MdLibraryBooks } from "react-icons/md";
import { useTranslations } from "next-intl";

interface CoursesDisplayProps {
    path: string
    courses: Curso[]
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    totalItems: number
}

export default function CoursesDisplay({
    path,
    courses,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    onPageChange,
    totalItems
}: CoursesDisplayProps) {
    const t = useTranslations("SelectCourses");
    const firstPathSegment = path.split("/").filter(segment => segment !== "")[0];
    const pageName = firstPathSegment === "tutores" ? t("tutors") : t("courses");

    const itemsPerPage = 10;

    return (
        <div className="flex-1 flex justify-center items-center pl-[240px]">
            <div className="BoxCurso">
                <div className="flex flex-row justify-between items-start w-full mb-6">
                    <div className="flex flex-col items-start">
                        <h1 className="text-xl font-poppins font-semibold text-left">{pageName}</h1>
                        <p style={{ color: '#374DAA' }} className="text-left text-xl font-semibold">
                            {t("chooseCourse")}
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={t("searchPlaceholder")} />
                    </div>
                </div>
                <div>
                    {courses.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 gap-4 justify-items-center">
                                {courses.map(course => (
                                    <CourseCard key={course.id} path={path} course={course} />
                                ))}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                                totalItems={totalItems}
                                itemsPerPage={itemsPerPage}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="text-gray-900 text-4xl mb-2"><MdLibraryBooks /></div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {t("emptyTitle")}
                            </h3>
                            <p className="text-gray-500 text-center">
                                {searchTerm ?
                                    t("emptySearch", { searchTerm }) :
                                    t("empty")
                                }
                            </p>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="mt-4 px-4 py-2 text-sm font-medium text-white bg-[#374DAA] rounded-lg hover:bg-[#2a3a85] transition-colors"
                                >
                                    {t("clearSearch")}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
