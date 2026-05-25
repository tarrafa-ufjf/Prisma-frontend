'use client';

import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import AdminAuth from "@/components/pages/administrador/admAuth";
import { api } from "@/utils/api";

interface SchedulerJob {
    channel: string;
    id: string;
    last_error: string | null;
    last_finished_at: string;
    last_started_at: string;
    last_status: string;
    next_run_at: string;
}

interface SchedulerStatus {
    heartbeat_timeout_seconds: number;
    jobs: SchedulerJob[];
    last_heartbeat_at: string;
    running: boolean;
}

export default function AdmRow() {

    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [loadingUsers, setLoadingUsers] = useState(true);

    const [schedulerStatus, setSchedulerStatus] =
        useState<SchedulerStatus | null>(null);

    const [loadingScheduler, setLoadingScheduler] =
        useState(true);

    const [showSchedulerDetails, setShowSchedulerDetails] =
        useState(false);

    useEffect(() => {

        async function loadUsers() {

            try {

                setLoadingUsers(true);

                const response = await api.get(
                    "/auth/users"
                );

                const users = response.data?.users || [];

                setTotalUsers(users.length);

            } catch (error) {

                console.error(
                    "Erro ao buscar usuários:",
                    error
                );

                setTotalUsers(0);

            } finally {

                setLoadingUsers(false);
            }
        }

        async function loadSchedulerStatus() {

            try {

                setLoadingScheduler(true);

                const response = await api.get(
                    "/admin/scheduler/status"
                );

                setSchedulerStatus(response.data);

            } catch (error) {

                console.error(
                    "Erro ao buscar status do scheduler:",
                    error
                );

                setSchedulerStatus(null);

            } finally {

                setLoadingScheduler(false);
            }
        }

        loadUsers();
        loadSchedulerStatus();

    }, []);

    return (

        <AdminAuth>
            <div className="flex flex-col gap-6 mt-4">

                <div className="Box2 mt-10">

                    <div className="mb-14">

                        <div className="maincurso flex items-center justify-between">

                            <div className="mt-a10 ml-10 mb-5">

                                <h1 className="text-xl font-poppins font-semibold text-left">
                                    <br />
                                    Visão Geral
                                </h1>

                                <p style={{ color: "#9291A5" }}>
                                    do sistema
                                </p>

                            </div>

                            <div className="mr-10 mt-6">

                                <Button
                                    onClick={() =>
                                        setShowSchedulerDetails(
                                            !showSchedulerDetails
                                        )
                                    }
                                >
                                    {showSchedulerDetails
                                        ? "Ocultar detalhes"
                                        : "Ver mais"}
                                </Button>

                            </div>

                        </div>

                        <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 after:shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />

                    </div>

                    <div className="flex flex-col mb-14 gap-8 px-10">

                        <div className="flex flex-row justify-between items-center">

                            <div className="flex flex-row items-center">

                                <p className="text-base text-gray-600 mb-2 text-left mr-6">
                                    Total de usuários do sistema
                                </p>

                                <div className="w-20 h-12 bg-gray-100 flex items-center justify-center rounded text-base font-semibold">

                                    {loadingUsers
                                        ? "..."
                                        : totalUsers}

                                </div>

                            </div>

                            <div className="flex flex-row items-center">

                                <p className="text-base text-gray-600 mb-2 text-left mr-6">
                                    Status do scheduler principal
                                </p>

                                <div className="w-20 h-12 bg-gray-100 flex items-center justify-center rounded text-base">

                                    {loadingScheduler
                                        ? "..."
                                        : schedulerStatus?.running
                                            ? "Online"
                                            : "Offline"}

                                </div>

                            </div>

                        </div>

                        {showSchedulerDetails && schedulerStatus && (

                            <div className="w-full bg-gray-50 rounded-xl p-6 border border-gray-200">

                                <div className="flex flex-col gap-6">

                                    <div>

                                        <h2 className="font-semibold text-lg mb-2">
                                            Scheduler
                                        </h2>

                                        <div className="flex flex-col gap-1 text-sm text-gray-700">

                                            <p>
                                                <strong>Status:</strong>{" "}
                                                {schedulerStatus.running
                                                    ? "Online"
                                                    : "Offline"}
                                            </p>

                                            <p>
                                                <strong>Último heartbeat:</strong>{" "}
                                                {new Date(
                                                    schedulerStatus.last_heartbeat_at
                                                ).toLocaleString("pt-BR")}
                                            </p>

                                            <p>
                                                <strong>Timeout:</strong>{" "}
                                                {
                                                    schedulerStatus.heartbeat_timeout_seconds
                                                } segundos
                                            </p>

                                        </div>

                                    </div>

                                    <div>

                                        <h2 className="font-semibold text-lg mb-4">
                                            Jobs
                                        </h2>

                                        <div className="flex flex-col gap-4">

                                            {schedulerStatus.jobs.map((job) => (

                                                <div
                                                    key={job.id}
                                                    className="bg-white border border-gray-200 rounded-lg p-4"
                                                >

                                                    <div className="flex flex-col gap-1 text-sm text-gray-700">

                                                        <p>
                                                            <strong>ID:</strong>{" "}
                                                            {job.id}
                                                        </p>

                                                        <p>
                                                            <strong>Canal:</strong>{" "}
                                                            {job.channel}
                                                        </p>

                                                        <p>
                                                            <strong>Status:</strong>{" "}
                                                            {job.last_status}
                                                        </p>

                                                        <p>
                                                            <strong>Última execução:</strong>{" "}
                                                            {new Date(
                                                                job.last_finished_at
                                                            ).toLocaleString("pt-BR")}
                                                        </p>

                                                        <p>
                                                            <strong>Próxima execução:</strong>{" "}
                                                            {new Date(
                                                                job.next_run_at
                                                            ).toLocaleString("pt-BR")}
                                                        </p>

                                                        {job.last_error && (

                                                            <p className="text-red-500">
                                                                <strong>Erro:</strong>{" "}
                                                                {job.last_error}
                                                            </p>

                                                        )}

                                                    </div>

                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

                <div className="Box pb-5">

                    <div className="maincurso">

                        <div className="mt-10 ml-10 mb-5">

                            <h1 className="text-xl font-poppins font-semibold text-left">
                                Gerenciar
                            </h1>

                            <p style={{ color: "#9291A5" }}>
                                cadastro de recursos
                            </p>

                        </div>

                    </div>

                    <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 bg-white" />

                    <div className="p-10 flex gap-4">

                        <Button href="/administrador/gerenciar/usuarios">
                            Gerenciar usuários
                        </Button>

                        <Button href="/administrador/gerenciar/moodle">
                            Gerenciar moodle
                        </Button>

                    </div>

                </div>

            </div>

        </AdminAuth>
    );
}