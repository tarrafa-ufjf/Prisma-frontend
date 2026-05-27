import { Link } from '@/i18n/navigation';
import { FaPlus } from 'react-icons/fa';

interface Disciplina {
    id: number;
    shortname: string;
    nome: string;
    data: string;
    value: number;
}

interface RenderizaDisciplinasProps {
    disciplinas: Disciplina[];
    type: 'best' | 'worst';
}

export default function RenderizaDisciplinas({ disciplinas, type }: RenderizaDisciplinasProps) {
    const disciplinasOrdenadas = [...disciplinas]
        .sort((a, b) => type === 'best' ? b.value - a.value : a.value - b.value)
        .slice(0, 5);

    return (
        <div className="bg-white rounded-lg p-4 space-y-4">
            {disciplinasOrdenadas.map((disciplina, index) => (
                <div
                    key={disciplina.value}
                    className="flex items-center justify-between px-6 py-5 bg-white shadow-sm rounded-md"
                >
                    <span className="w-6 text-left font-medium text-gray-700">
                        {index + 1}
                    </span>
                    <span
                        className="flex-1 text-left text-gray-800 truncate overflow-hidden whitespace-nowrap max-w-xs px-3"
                        title={disciplina.nome}>
                        {disciplina.nome}
                    </span>

                    <button className="text-gray-700 cursor-pointer hover:text-gray-900">
                        <Link
                            href={{
                                pathname: '/cursos',
                                query: {
                                    id: disciplina.id
                                }
                            }}
                        >
                            <FaPlus className='text-2xl text-gray-700' />
                        </Link>
                    </button>
                </div>
            ))}
        </div>
    );
}
