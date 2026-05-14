'use client';

import { useEffect, useState } from "react";

import PageTemplate from "@/components/template/page-template";
import DataTable from "@/components/template/dataTable";

import { api } from "@/utils/api";

import {
    Pencil,
    Save,
    Trash2,
    X
} from "lucide-react";

export default function GerenciarUsuariosPage() {

    const [searchTerm] = useState("");

    const [editingUserId, setEditingUserId] = useState<number | null>(null);

    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        async function loadUsers() {
            try {
                const response = await api.get('/auth/users');

                setUsers(response.data.users);

            } catch (error) {
                console.error('Erro ao carregar usuários:', error);
            }
        }

        loadUsers();
    }, []);

    const handleDelete = async (id: number) => {

        const confirmDelete = window.confirm(
            "Tem certeza que deseja deletar este usuário?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/auth/users/${id}`);

            setUsers((prev) =>
                prev.filter((user) => user.id !== id)
            );

        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    const handleEdit = (id: number) => {
        setEditingUserId(id);
    };

    const handleCancel = () => {
        setEditingUserId(null);
    };

    const handleSave = async (id: number) => {
        try {
            const user = users.find((u) => u.id === id);

            await api.patch(`/auth/users/${id}`, {
                email: user.email,
            });

            setEditingUserId(null);

        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };

    const handleChange = (
        id: number,
        field: "email",
        value: string
    ) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id
                    ? {
                        ...user,
                        [field]: value
                    }
                    : user
            )
        );
    };

    const columns = [
        {
            label: "E-mail",
            name: "email",

            options: {
                headerClassName:
                    "w-[75%] text-left pl-6 border-r border-gray-200",

                cellClassName:
                    "w-[75%] text-left pl-6 border-r border-gray-100",
            },

            cell: (row: any) => {
                const isEditing = editingUserId === row.id;

                return isEditing ? (
                    <input
                        type="email"
                        value={row.email}
                        onChange={(e) =>
                            handleChange(
                                row.id,
                                "email",
                                e.target.value
                            )
                        }
                        className="
                            border
                            border-gray-200
                            rounded-lg
                            p-2
                            w-[90%]
                        "
                    />
                ) : (
                    <span>{row.email}</span>
                );
            },
        },

        {
            label: "",
            name: "actions",

            options: {
                headerClassName: "w-[25%] text-center",

                cellClassName: "w-[25%] text-center",
            },

            cell: (row: any) => {
                const isEditing = editingUserId === row.id;

                return (
                    <div className="flex items-center justify-center gap-6">

                        {isEditing ? (
                            <>
                                <button
                                    onClick={() =>
                                        handleSave(row.id)
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        text-[#374DAA]
                                        hover:text-[#2d3f8a]
                                        transition-colors
                                        cursor-pointer
                                    "
                                >
                                    <Save size={18} />
                                    Salvar
                                </button>

                                <button
                                    onClick={handleCancel}
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        text-gray-500
                                        hover:text-gray-700
                                        transition-colors
                                        cursor-pointer
                                    "
                                >
                                    <X size={18} />
                                    Cancelar
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() =>
                                        handleEdit(row.id)
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        text-[#374DAA]
                                        hover:text-[#2d3f8a]
                                        transition-colors
                                        cursor-pointer
                                    "
                                >
                                    <Pencil size={18} />
                                    Editar
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(row.id)
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        text-red-500
                                        hover:text-red-700
                                        transition-colors
                                        cursor-pointer
                                    "
                                >
                                    <Trash2 size={18} />
                                    Deletar
                                </button>
                            </>
                        )}

                    </div>
                );
            },
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