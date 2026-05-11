'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageTemplate from "@/components/template/page-template";
import { Eye, EyeOff, Pencil, Save, Trash2, X } from "lucide-react";

export default function GerenciarMoodlePage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [moodle, setMoodle] = useState({
        host: "localhost",
        port: "5432",
        database: "moodle",
        user: "postgres",
        password: "123456"
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        console.log("Salvar moodle:", moodle);
        setIsEditing(false);
    };

    // 🔴 DELETE FLOW
    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    const confirmDelete = () => {
        setShowDeleteModal(false);
        setShowSuccess(true);

        router.push("/administrador");
    };

    return (
        <PageTemplate
            title="Gerenciar"
            subTitle="Moodle"
        >
            <div className="Box pb-10 mt-4">

                <div className="maincurso">
                    <div className="mt-10 ml-10 mb-5">
                        <h1 className="text-xl font-poppins font-semibold text-left">
                            Configuração Moodle
                        </h1>

                        <p style={{ color: "#9291A5" }}>
                            gerenciamento da integração
                        </p>
                    </div>
                </div>

                <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 after:shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />

                <div className="p-10 flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-gray-500">Host</p>

                        {isEditing ? (
                            <input
                                type="text"
                                value={moodle.host}
                                onChange={(e) =>
                                    setMoodle({ ...moodle, host: e.target.value })
                                }
                                className="border border-gray-200 rounded-lg p-3"
                            />
                        ) : (
                            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                                {moodle.host}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-gray-500">Porta</p>

                        {isEditing ? (
                            <input
                                type="text"
                                value={moodle.port}
                                onChange={(e) =>
                                    setMoodle({ ...moodle, port: e.target.value })
                                }
                                className="border border-gray-200 rounded-lg p-3"
                            />
                        ) : (
                            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                                {moodle.port}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-gray-500">Database</p>

                        {isEditing ? (
                            <input
                                type="text"
                                value={moodle.database}
                                onChange={(e) =>
                                    setMoodle({ ...moodle, database: e.target.value })
                                }
                                className="border border-gray-200 rounded-lg p-3"
                            />
                        ) : (
                            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                                {moodle.database}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-gray-500">Usuário</p>

                        {isEditing ? (
                            <input
                                type="text"
                                value={moodle.user}
                                onChange={(e) =>
                                    setMoodle({ ...moodle, user: e.target.value })
                                }
                                className="border border-gray-200 rounded-lg p-3"
                            />
                        ) : (
                            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                                {moodle.user}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-gray-500">Senha</p>

                        {isEditing ? (
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={moodle.password}
                                    onChange={(e) =>
                                        setMoodle({ ...moodle, password: e.target.value })
                                    }
                                    className="border border-gray-200 rounded-lg p-3 w-full pr-10"
                                />

                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        ) : (
                            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex justify-between">
                                <span>
                                    {showPassword
                                        ? moodle.password
                                        : "•".repeat(moodle.password.length)}
                                </span>

                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-6 mt-4">

                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="text-[#374DAA] flex gap-2">
                                    <Save size={18} /> Salvar
                                </button>

                                <button onClick={handleCancel} className="text-gray-500 flex gap-2">
                                    <X size={18} /> Cancelar
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleEdit} className="text-[#374DAA] flex gap-2">
                                    <Pencil size={18} /> Editar
                                </button>

                                <button
                                    onClick={handleDelete}
                                    className="text-red-500 flex gap-2"
                                >
                                    <Trash2 size={18} /> Deletar
                                </button>
                            </>
                        )}

                    </div>

                </div>
            </div>

            {/* MODAL DELETE */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[400px]">

                        <h2 className="text-lg font-semibold mb-2">
                            Confirmar exclusão
                        </h2>

                        <p className="text-sm text-gray-500 mb-6">
                            Tem certeza que deseja deletar as configurações?
                        </p>

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 text-gray-600"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Confirmar
                            </button>

                        </div>

                    </div>
                </div>
            )}

            {/* SUCCESS MESSAGE */}
            {showSuccess && (
                <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50">
                    Configurações deletadas com sucesso!
                </div>
            )}

        </PageTemplate>
    );
}