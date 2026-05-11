import Button from "@/components/ui/button";

export default function AdmRow() {
    return (
        <div className="flex flex-col gap-6 mt-4">

            <div className="Box2 mt-10">
                <div className="mb-14">
                    <div className="maincurso">
                        <div className="mt-10 ml-10 mb-5">
                            <h1 className="text-xl font-poppins font-semibold text-left">
                                Visão Geral
                            </h1>

                            <p style={{ color: "#9291A5" }}>
                                do sistema
                            </p>
                        </div>
                    </div>

                    <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 after:shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />
                </div>

                <div className="flex items-center justify-center mb-14">
                    <div className="flex flex-row justify-between items-center space-x-47">

                        <div className="flex flex-row items-center">
                            <p className="text-base text-gray-600 mb-2 text-left mr-6">
                                Total de usuários do sistema
                            </p>

                            <div className="w-20 h-12 bg-gray-100 flex items-center justify-center rounded text-base">
                                125
                            </div>
                        </div>

                        <div className="flex flex-row items-center">
                            <p className="text-base text-gray-600 mb-2 text-left mr-6">
                                Status do scheduler principal
                            </p>

                            <div className="w-20 h-12 bg-gray-100 flex items-center justify-center rounded text-base">
                                Online
                            </div> 
                        </div>

                    </div>
                </div>
            </div>

            <div className="Box pb-5">
                <div className="maincurso">
                    <div className="mt-10 ml-10 mb-5">
                        <h1 className="text-xl font-poppins font-semibold text-left">
                            Cadastrar
                        </h1>

                        <p style={{ color: "#9291A5" }}>
                            novos recursos
                        </p>
                    </div>
                </div>

                <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 bg-white" />

                <div className="p-10 flex gap-4">
                    <Button href="/administrador/cadastrar/usuario">
                        Cadastrar usuário
                    </Button>

                    <Button href="/administrador/cadastrar/moodle">
                        Cadastrar moodle
                    </Button>
                </div>
            </div>

            <div className="Box pb-5">
                <div className="maincurso">
                    <div className="mt-10 ml-10 mb-5">
                        <h1 className="text-xl font-poppins font-semibold text-left">
                            Gerenciar
                        </h1>

                        <p style={{ color: "#9291A5" }}>
                            recursos cadastrados
                        </p>
                    </div>
                </div>

                <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 bg-white" />

                <div className="p-10 flex gap-4">
                    <Button href="/administrador/gerenciar/usuarios">
                        Gerenciar usuários
                    </Button>

                    <Button href="/administrador/gerenciar/moodles">
                        Gerenciar moodle
                    </Button>
                </div>
            </div>

        </div>
    );
}