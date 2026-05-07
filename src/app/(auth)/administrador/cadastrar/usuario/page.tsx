'use client';

import PageTemplate from "@/components/template/page-template";
import Button from "@/components/ui/button";

export default function CadastrarUsuarioPage() {
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

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700">
                            Nome
                        </label>

                        <input
                            type="text"
                            placeholder="Digite o nome do usuário"
                            className="border border-gray-200 rounded-lg p-3"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Digite o email"
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
                            className="border border-gray-200 rounded-lg p-3"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700">
                            Perfil
                        </label>

                        <select className="border border-gray-200 rounded-lg p-3">
                            <option>Administrador</option>
                            <option>Tutor</option>
                            <option>Professor</option>
                        </select>
                    </div>

                    <div className="mt-4">
                        <Button href="#">
                            Cadastrar usuário
                        </Button>
                    </div>

                </div>
            </div>
        </PageTemplate>
    );
}