'use client';

import Alunos from '@/components/pages/Alunos/Alunos';
import { useCookie } from '@/hooks/useCookie';
import { Curso as CursoType } from '@/types/curso';

interface AlunosPageClientProps {
    cursos: CursoType[]
    curso: CursoType
}

export default function AlunosPageClient({ curso, cursos }: AlunosPageClientProps) {
    const [savedCourse, setCourse, deleteCourse, setCourseOnly] = useCookie<CursoType | null>('course', null)
    setCourseOnly(curso)

    return (<Alunos curso={curso} />
    );
}
