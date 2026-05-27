'use client';

import AnotacoesPage from "@/components/pages/Homepage/Chatbot/Anotacoes";
import ChatbotPage from "@/components/pages/Homepage/Chatbot/Chatbot";
import GraficoVegaPage from "@/components/pages/Homepage/Chatbot/GraficoVega";

export default function ChatPage() {
    return (
        <div className="w-full min-h-screen bg-white pl-[290px] pr-16 py-6">
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-48px)]">
                <div className="col-span-4 h-full">
                    <ChatbotPage />
                </div>

                <div className="col-span-8 flex flex-col gap-6 h-full">
                    <div className="h-[52%]">
                        <GraficoVegaPage />
                    </div>
                    <div className="flex-1">
                        <AnotacoesPage />
                    </div>
                </div>

            </div>
        </div>
    );
}