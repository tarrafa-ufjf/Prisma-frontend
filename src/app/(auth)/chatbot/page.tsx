'use client';

import { useState } from "react";
import ChatbotPage from "@/components/pages/Homepage/Chatbot/Chatbot";
import GraficoVegaPage from "@/components/pages/Homepage/Chatbot/GraficoVega";

export default function ChatPage() {

    const [response, setResponse] = useState<any>(null);

    return (
        <div className="w-full min-h-screen bg-white pl-[290px] pr-16 py-6">

            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-48px)]">

                <div className="col-span-5 h-full">
                    <ChatbotPage
                        setResponse={setResponse}
                    />
                </div>

                <div className="col-span-7 flex flex-col gap-6 h-full">
                    <GraficoVegaPage
                        vegaSpec={response?.vega}
                    />
                </div>

            </div>

        </div>
    );
}