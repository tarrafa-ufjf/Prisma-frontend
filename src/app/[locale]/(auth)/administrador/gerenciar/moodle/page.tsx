'use client';

import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

import PageTemplate from "@/components/template/page-template";
import Button from "@/components/ui/button";

import {
    Pencil,
    X
} from "lucide-react";

import { api } from "@/utils/api";

export default function GerenciarMoodlePage() {

    const t = useTranslations('Admin.ManageMoodle');

    const [host, setHost] = useState('');
    const [port, setPort] = useState('');
    const [database, setDatabase] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [loadingTest, setLoadingTest] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [successModal, setSuccessModal] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [hasConfig, setHasConfig] = useState(false);

    const loadConfig = async () => {

        try {

            const response = await api.get(
                "/admin/moodle-config"
            );

            const config = response.data?.config;

            if (config) {

                setHasConfig(true);

                setHost(config.host || '');
                setPort(String(config.port || ''));
                setDatabase(config.database || '');
                setUser(config.user || '');

                // senha não retorna
                setPassword('');

                setIsEditing(false);
            }

        } catch (error) {

            console.error(
                "Erro ao buscar config:",
                error
            );
        }
    };

    useEffect(() => {
        loadConfig();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = async () => {

        await loadConfig();

        setIsEditing(false);
    };

    const handleTestConnection = async () => {

        try {

            setLoadingTest(true);

            const payload = {
                database,
                host,
                password,
                port: Number(port),
                user
            };

            const response = await api.post(
                "/admin/moodle-config/test",
                payload
            );

            setSuccessModal(true);

            setModalMessage(
                t('testSuccess', { version: response.data.version })
            );

            setShowModal(true);

        } catch (error) {

            console.error(
                "Erro teste:",
                error
            );

            setSuccessModal(false);

            setModalMessage(t('testError'));

            setShowModal(true);

        } finally {

            setLoadingTest(false);
        }
    };

    const handleSave = async () => {

        try {

            setLoadingSave(true);

            const payload = {
                database,
                host,
                password,
                port: Number(port),
                user
            };

            await api.put(
                "/admin/moodle-config",
                payload
            );

            setSuccessModal(true);

            setModalMessage(
                hasConfig
                    ? t('saveSuccessUpdate')
                    : t('saveSuccessCreate')
            );

            setShowModal(true);

            setHasConfig(true);

            setIsEditing(false);

        } catch (error) {

            console.error(
                "Erro save:",
                error
            );

            setSuccessModal(false);

            setModalMessage(t('saveError'));

            setShowModal(true);

        } finally {

            setLoadingSave(false);
        }
    };

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

                <div className="p-10 flex flex-col gap-6">

                    {/* HOST */}
                    <div className="flex flex-col gap-2">

                        <label className="text-sm text-gray-700">
                            {t('host')}
                        </label>

                        <input
                            type="text"
                            placeholder={t('hostPlaceholder')}
                            value={host}
                            onChange={(e) => setHost(e.target.value)}
                            disabled={hasConfig && !isEditing}
                            className="border border-gray-200 rounded-lg p-3 disabled:bg-gray-50 disabled:text-gray-500"
                        />

                    </div>

                    {/* PORTA */}
                    <div className="flex flex-col gap-2">

                        <label className="text-sm text-gray-700">
                            {t('port')}
                        </label>

                        <input
                            type="number"
                            placeholder={t('portPlaceholder')}
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            disabled={hasConfig && !isEditing}
                            className="border border-gray-200 rounded-lg p-3 disabled:bg-gray-50 disabled:text-gray-500"
                        />

                    </div>

                    {/* DATABASE */}
                    <div className="flex flex-col gap-2">

                        <label className="text-sm text-gray-700">
                            {t('database')}
                        </label>

                        <input
                            type="text"
                            placeholder={t('databasePlaceholder')}
                            value={database}
                            onChange={(e) => setDatabase(e.target.value)}
                            disabled={hasConfig && !isEditing}
                            className="border border-gray-200 rounded-lg p-3 disabled:bg-gray-50 disabled:text-gray-500"
                        />

                    </div>

                    {/* USER */}
                    <div className="flex flex-col gap-2">

                        <label className="text-sm text-gray-700">
                            {t('user')}
                        </label>

                        <input
                            type="text"
                            placeholder={t('userPlaceholder')}
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            disabled={hasConfig && !isEditing}
                            className="border border-gray-200 rounded-lg p-3 disabled:bg-gray-50 disabled:text-gray-500"
                        />

                    </div>

                    {/* PASSWORD */}
                    <div className="flex flex-col gap-2">

                        <label className="text-sm text-gray-700">
                            {t('password')}
                        </label>

                        <input
                            type="password"
                            placeholder={
                                hasConfig && !isEditing
                                    ? t('passwordProtected')
                                    : t('passwordPlaceholder')
                            }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={hasConfig && !isEditing}
                            className="border border-gray-200 rounded-lg p-3 disabled:bg-gray-50 disabled:text-gray-500"
                        />

                    </div>

                    {/* BUTTONS */}
                    <div className="mt-4 flex gap-4 items-center">

                        {(isEditing || !hasConfig) && (
                            <>
                                <Button onClick={handleTestConnection}>
                                    {loadingTest
                                        ? t('testing')
                                        : t('testConnection')}
                                </Button>

                                <Button onClick={handleSave}>
                                    {loadingSave
                                        ? t('saving')
                                        : hasConfig
                                            ? t('saveChanges')
                                            : t('registerMoodle')}
                                </Button>
                            </>
                        )}

                        {hasConfig && !isEditing && (
                            <button
                                onClick={handleEdit}
                                className="text-[#374DAA] flex items-center gap-2"
                            >
                                <Pencil size={18} />
                                {t('edit')}
                            </button>
                        )}

                        {isEditing && (
                            <button
                                onClick={handleCancelEdit}
                                className="text-gray-500 flex items-center gap-2"
                            >
                                <X size={18} />
                                {t('cancel')}
                            </button>
                        )}

                    </div>

                </div>

            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">

                        <h2 className="text-lg font-semibold mb-2">
                            {successModal
                                ? t('success')
                                : t('error')}
                        </h2>

                        <p className="text-sm text-gray-500 mb-6">
                            {modalMessage}
                        </p>

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => setShowModal(false)}
                                className={`px-4 py-2 text-white rounded-lg ${
                                    successModal
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }`}
                            >
                                {successModal
                                    ? t('ok')
                                    : t('understand')}
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </PageTemplate>
    );
}