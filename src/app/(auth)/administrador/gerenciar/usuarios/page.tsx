'use client';

import { useState } from "react";
import PageTemplate from "@/components/template/page-template";
import DataTable from "@/components/template/dataTable";
import { Eye, EyeOff, Trash2 } from "lucide-react";

export default function GerenciarUsuariosPage() {
    const [searchTerm] = useState("");
    const [visiblePasswords, setVisiblePasswords] = useState<number[]>([]);

    const users = [
        {
            id: 1,
            email: "admin@sistema.com",
            password: "123456"
        },
        {
            id: 2,
            email: "maria@instituicao.com",
            password: "abcdefghi"
        },
        {
            id: 3,
            email: "joao@instituicao.com",
            password: "987654321"
        }
    ];

    const handleDelete = (id: number) => {
        console.log("Deletar usuário:", id);
    };

    const togglePasswordVisibility = (id: number) => {
        setVisiblePasswords((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const columns = [
        {
            label: "E-mail",
            name: "email",
            options: {
                headerClassName: "text-left pl-6 border-r border-gray-200",
                cellClassName: "text-left pl-6 border-r border-gray-100",
            },
        },
        {
            label: "Senha",
            name: "password",
            options: {
                headerClassName: "text-left pl-6 border-r border-gray-200",
                cellClassName: "text-left pl-6 border-r border-gray-100",
            },
            cell: (row: any) => {
                const isVisible = visiblePasswords.includes(row.id);

                return (
                    <div className="flex items-center justify-between pr-4">
                        <span>
                            {isVisible
                                ? row.password
                                : "•".repeat(row.password.length)}
                        </span>

                        <button
                            onClick={() => togglePasswordVisibility(row.id)}
                            className="
                                text-gray-500
                                hover:text-gray-700
                                transition-colors
                                cursor-pointer
                            "
                        >
                            {isVisible ? (
                                <EyeOff size={16} />
                            ) : (
                                <Eye size={16} />
                            )}
                        </button>
                    </div>
                );
            },
        },
        {
            label: "",
            name: "delete",
            options: {
                headerClassName: "text-center",
                cellClassName: "text-center",
            },
            cell: (row: any) => (
                <button
                    onClick={() => handleDelete(row.id)}
                    className="
                        flex
                        items-center
                        justify-center
                        mx-auto
                        text-red-500
                        hover:text-red-700
                        transition-colors
                        cursor-pointer
                    "
                >
                    <Trash2 size={18} />
                </button>
            ),
        },
    ];

    return (
        <PageTemplate
            title="Gerenciar"
            subTitle="Usuários"
        >
            <div className="Box pb-10 mt-4">

                <div className="maincurso">
                    <div className="mt-10 ml-10 mb-5">
                        <h1 className="text-xl font-poppins font-semibold text-left">
                            Usuários Cadastrados
                        </h1>

                        <p style={{ color: "#9291A5" }}>
                            gerenciamento de acessos
                        </p>
                    </div>
                </div>

                <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 after:shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />

                <div className="p-10">
                    <DataTable
                        rowsPerPage={5}
                        data={users}
                        columns={columns}
                        searchTerm={searchTerm}
                    />
                </div>

            </div>
        </PageTemplate>
    );
}