'use client';

import { useState } from "react";
import type { VisualizationSpec } from "vega-embed";
import ChatbotPage from "@/components/pages/Homepage/Chatbot/Chatbot";
import GraficoVegaPage from "@/components/pages/Homepage/Chatbot/GraficoVega";

export default function ChatPage() {
    const [vegaSpec, setVegaSpec] = useState<VisualizationSpec | null>();

    return (
        <div className="min-h-screen w-full min-w-0 max-w-full overflow-x-hidden bg-white pl-[290px] pr-16 py-6">
            <div className="grid h-[calc(100vh-48px)] min-w-0 grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="h-full min-w-0 overflow-hidden">
                    <ChatbotPage setVegaSpec={setVegaSpec} />
                </div>

                <div className="h-full min-w-0 overflow-hidden">
                    <GraficoVegaPage vegaSpec={vegaSpec} />
                </div>
            </div>
        </div>
    );
}
