'use client';

import React from "react";

import PageTemplate from "@/components/template/page-template";
import Button from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import ErrorMessage from "@/components/ui/error-message";

import { api } from "@/utils/api";

export default function CadastrarUsuarioPage() {

    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState("");
    const [error, setError] = React.useState("");

    async function cadastrarUsuario() {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const response = await api.post("/auth/users", {
                email,
                password: senha,
            });

            console.log("Usuário criado:", response.data);
            setSuccess("Usuário cadastrado com sucesso!");
            setEmail("");
            setSenha("");

        } catch (error: any) {
            console.error("Erro ao cadastrar usuário:", error);
            setError(
                error?.response?.data?.detail ||
                "Erro ao cadastrar usuário."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <PageTemplate
            title="Cadastrar"
            subTitle="Usuário"
        >
            <div className="Box pb-10 mt-4">

                <div className="maincurso">

                    <div className="mt-10 ml-10 mb-5">

                        <h1 className="text-xl font-poppins font-semibold text-left">
                            Novo Usuário
                        </h1>

                        <p style={{ color: "#9291A5" }}>
                            gerenciamento de acessos
                        </p>

                    </div>

                </div>

                <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 bg-white" />

                <div className="p-10 flex flex-col gap-6">

                    {loading && (
                        <Loading>
                            Cadastrando usuário...
                        </Loading>
                    )}

                    {error && (
                        <ErrorMessage>
                            {error}
                        </ErrorMessage>
                    )}

                    {success && (
                        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
                            {success}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">

                        <label className="text-sm text-gray-700">
                            E-mail
                        </label>

                        <input
                            type="email"
                            placeholder="Digite o e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-200 rounded-lg p-3"
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <label className="text-sm text-gray-700">
                            Senha
                        </label>

                        <input
                            type="password"
                            placeholder="Digite a senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="border border-gray-200 rounded-lg p-3"
                        />

                    </div>
                    <div className="mt-4">

                        <Button onClick={cadastrarUsuario}>
                            Cadastrar usuário
                        </Button>

                    </div>

                </div>
            </div>
        </PageTemplate>
    );
}