'use client';

import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

import PageTemplate from "@/components/template/page-template";
import DataTable from "@/components/template/dataTable";
import Button from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import ErrorMessage from "@/components/ui/error-message";

import { api } from "@/utils/api";

import {
    Pencil,
    Save,
    Trash2,
    X
} from "lucide-react";

export default function UsuariosPage() {

    const t = useTranslations('Admin.ManageUsers');

    const [searchTerm] = useState("");

    const [editingUserId, setEditingUserId] =
        useState<number | null>(null);

    const [users, setUsers] = useState<any[]>([]);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [selectedUserId, setSelectedUserId] =
        useState<number | null>(null);

    function emailValido(email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const emailEhValido =
        email.length > 0 &&
        emailValido(email);

    useEffect(() => {

        async function loadUsers() {

            try {

                const response = await api.get(
                    "/auth/users"
                );

                setUsers(
                    response.data.users
                );

            } catch (error) {

                console.error(
                    "Erro ao carregar usuários:",
                    error
                );
            }
        }

        loadUsers();

    }, []);

    async function cadastrarUsuario() {

        try {

            setLoading(true);

            setError("");
            setSuccess("");

            if (!emailValido(email)) {

                setError(t('emailInvalidError'));

                setLoading(false);

                return;
            }

            const response = await api.post(
                "/auth/users",
                {
                    email,
                    password: senha,
                }
            );

            const novoUsuario =
                response.data.user;

            if (novoUsuario) {

                setUsers((prev) => [
                    ...prev,
                    novoUsuario
                ]);
            }

            setSuccess(t('registerSuccess'));

            setEmail("");
            setSenha("");

        } catch (error: any) {

            console.error(
                "Erro ao cadastrar usuário:",
                error
            );

            setError(
                error?.response?.data?.detail ||
                t('registerError')
            );

        } finally {

            setLoading(false);
        }
    }

    const handleDelete = (id: number) => {

        setSelectedUserId(id);

        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {

        if (!selectedUserId) {
            return;
        }

        try {

            await api.delete(
                `/auth/users/${selectedUserId}`
            );

            setUsers((prev) =>
                prev.filter(
                    (user) =>
                        user.id !== selectedUserId
                )
            );

            setSuccess(t('deleteSuccess'));

        } catch (error) {

            console.error(
                "Erro ao deletar usuário:",
                error
            );

            setError(t('deleteError'));

        } finally {

            setShowDeleteModal(false);

            setSelectedUserId(null);
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

            const user = users.find(
                (u) => u.id === id
            );

            if (!emailValido(user.email)) {

                setError(t('emailInvalid'));

                return;
            }

            setError("");

            await api.patch(
                `/auth/users/${id}`,
                {
                    email: user.email,
                }
            );

            setSuccess(t('updateSuccess'));

            setEditingUserId(null);

        } catch (error: any) {

            console.error(
                "Erro ao atualizar usuário:",
                error
            );

            setError(
                error?.response?.data?.detail ||
                t('updateError')
            );
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
            label: t('email'),
            name: "email",

            options: {

                headerClassName:
                    "w-[75%] text-left pl-6 border-r border-gray-200",

                cellClassName:
                    "w-[75%] text-left pl-6 border-r border-gray-100",
            },

            cell: (row: any) => {

                const isEditing =
                    editingUserId === row.id;

                return isEditing ? (

                    <div className="flex flex-col gap-1 w-full items-start">

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

                        {row.email.length > 0 && (

                            emailValido(row.email) ? (

                                <p className="text-xs text-green-600 ml-1">
                                    {t('emailValid')}
                                </p>

                            ) : (

                                <p className="text-xs text-red-500 ml-1">
                                    {t('emailInvalid')}
                                </p>

                            )
                        )}

                    </div>

                ) : (

                    <span>{row.email}</span>
                );
            },
        },

        {
            label: "",
            name: "actions",

            options: {

                headerClassName:
                    "w-[25%] text-center",

                cellClassName:
                    "w-[25%] text-center",
            },

            cell: (row: any) => {

                const isEditing =
                    editingUserId === row.id;

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
                                    {t('save')}
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
                                    {t('cancel')}
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
                                    {t('edit')}
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
                                    {t('delete')}
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
            title={t('templateTitle')}
            subTitle={t('templateSubtitle')}
        >

            <div className="Box pb-10 mt-4">

                <div className="maincurso">

                    <div className="mt-10 ml-10 mb-5">

                        <h1 className="text-xl font-poppins font-semibold text-left">
                            {t('title')}
                        </h1>

                        <p style={{ color: "#9291A5" }}>
                            {t('subtitle')}
                        </p>

                    </div>

                </div>

                <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 bg-white" />

                {/* FORMULÁRIO */}
                <div className="p-10 flex flex-col gap-6">

                    {/* EMAIL */}
                    <div className="flex flex-col gap-2">

                        <label className="text-sm text-gray-700">
                            {t('email')}
                        </label>

                        <input
                            type="email"
                            placeholder={t('emailPlaceholder')}
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="
                                border
                                border-gray-200
                                rounded-lg
                                p-3
                            "
                        />

                        {email.length > 0 && (

                            emailEhValido ? (

                                <p className="text-xs text-green-600 ml-1">
                                    {t('emailValid')}
                                </p>

                            ) : (

                                <p className="text-xs text-red-500 ml-1">
                                    {t('emailInvalidFormat')}
                                </p>

                            )
                        )}

                    </div>

                    {/* SENHA */}
                    <div className="flex flex-col gap-2">

                        <label className="text-sm text-gray-700">
                            {t('password')}
                        </label>

                        <input
                            type="password"
                            placeholder={t('passwordPlaceholder')}
                            value={senha}
                            onChange={(e) =>
                                setSenha(e.target.value)
                            }
                            className="
                                border
                                border-gray-200
                                rounded-lg
                                p-3
                            "
                        />

                    </div>

                    {/* BOTÃO */}
                    <div className="mt-4">

                        <Button
                            onClick={cadastrarUsuario}
                            disabled={!emailEhValido}
                        >
                            {t('registerButton')}
                        </Button>

                    </div>

                    {/* FEEDBACK */}
                    {loading && (
                        <div className="mt-2">
                            <Loading>
                                {t('loadingRegister')}
                            </Loading>
                        </div>
                    )}

                    {error && (
                        <div className="mt-2">
                            <ErrorMessage>
                                {error}
                            </ErrorMessage>
                        </div>
                    )}

                    {success && (
                        <div className="
                            mt-2
                            bg-green-100
                            border
                            border-green-300
                            text-green-700
                            px-4
                            py-3
                            rounded-lg
                        ">
                            {success}
                        </div>
                    )}

                </div>

                {/* DIVISÓRIA */}
                <div className="
                    relative
                    after:absolute
                    after:bottom-0
                    after:left-1/2
                    after:translate-x-[-50%]
                    after:w-[90%]
                    after:h-[1px]
                    after:bg-gray-200
                    after:shadow-[0_2px_4px_rgba(0,0,0,0.05)]
                    bg-white
                    mt-4
                " />

                {/* TABELA */}
                <div className="p-10">

                    <DataTable
                        rowsPerPage={5}
                        data={users}
                        columns={columns}
                        searchTerm={searchTerm}
                    />

                </div>

            </div>

            {/* MODAL DELETE */}
            {showDeleteModal && (

                <div className="
                    fixed
                    inset-0
                    bg-black/40
                    flex
                    items-center
                    justify-center
                    z-50
                ">

                    <div className="
                        bg-white
                        rounded-xl
                        p-6
                        w-[400px]
                        shadow-lg
                    ">

                        <h2 className="
                            text-lg
                            font-semibold
                            mb-2
                        ">
                            {t('confirmDeleteTitle')}
                        </h2>

                        <p className="
                            text-sm
                            text-gray-500
                            mb-6
                        ">
                            {t('confirmDeleteText')}
                        </p>

                        <div className="
                            flex
                            justify-end
                            gap-3
                        ">

                            <button
                                onClick={() =>
                                    setShowDeleteModal(false)
                                }
                                className="
                                    px-4
                                    py-2
                                    text-gray-600
                                "
                            >
                                {t('cancel')}
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="
                                    px-4
                                    py-2
                                    bg-red-500
                                    text-white
                                    rounded-lg
                                "
                            >
                                {t('confirm')}
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </PageTemplate>
    );
}