import Sidebar from "@/components/ui/sidebar";
import { Curso } from "@/types/curso";

interface NotFoundProps {
    cursos?: Curso[] | null
    children: React.ReactNode
}

export default function NotFound({ cursos, children }: NotFoundProps) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
};
