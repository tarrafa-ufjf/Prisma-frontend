'use client';

import PageTemplate from "@/components/template/page-template";
import Button from "@/components/ui/button";

export default function CadastrarMoodlePage() {
    return (
        <PageTemplate
            title="Cadastrar"
            subTitle="Moodle"
        >
            <div className="Box pb-10 mt-4">
                <div className="maincurso">
                    <div className="mt-10 ml-10 mb-5">
                        <h1 className="text-xl font-poppins font-semibold text-left">
                            Nova Integração Moodle
                        </h1>

                        <p style={{ color: "#9291A5" }}>
                            gerenciamento de integrações
                        </p>
                    </div>
                </div>

                <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 bg-white" />

                <div className="p-10 flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700">
                            Host
                        </label>

                        <input
                            type="text"
                            placeholder="Digite o host"
                            className="border border-gray-200 rounded-lg p-3"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700">
                            Porta
                        </label>

                        <input
                            type="int"
                            placeholder="Digite a porta"
                            className="border border-gray-200 rounded-lg p-3"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700">
                            Database
                        </label>

                        <input
                            type="text"
                            placeholder="Digite database"
                            className="border border-gray-200 rounded-lg p-3"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700">
                            Usuário
                        </label>

                        <input
                            type="text"
                            placeholder="Digite o usuário"
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

                    <div className="mt-4">
                        <Button href="#">
                            Cadastrar moodle
                        </Button>
                    </div>

                </div>
            </div>
        </PageTemplate>
    );
}