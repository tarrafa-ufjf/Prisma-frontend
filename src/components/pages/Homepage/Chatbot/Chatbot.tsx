'use client';

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import SuggestionBox from "./Sugestões";
import { api } from "@/utils/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
}

interface ChatbotPageProps {
    setResponse: (response: any) => void;
}

export default function ChatbotPage({
    setResponse
}: ChatbotPageProps) {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    async function askChatbot(question: string) {

        const response = await api.post(
            "/chatbot",
            {
                question
            }
        );

        return response.data;
    }
        
    async function sendMessage(text: string) {

        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text,
            sender: "user"
        };

        setMessages((prev) => [
            ...prev,
            userMessage
        ]);

        setInput("");
        setIsTyping(true);

        try {

            const result = await askChatbot(text);
            setResponse(result);

            console.log(result);
            
            const botMessage: Message = {
                id: Date.now() + 1,
                text: result.answer,
                sender: "bot"
            };

            setMessages((prev) => [
                ...prev,
                botMessage
            ]);

        } catch (error) {

            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "Erro ao consultar o chatbot.",
                sender: "bot"
            };

            setMessages((prev) => [
                ...prev,
                errorMessage
            ]);

        } finally {

            setIsTyping(false);

        }
    }

    return (

        <div
            className="
                Box
                h-[calc(100vh-48px)]
                flex
                flex-col
                overflow-hidden
            "
        >

            {/* HEADER */}

            <div className="maincurso shrink-0">

                <div className="mt-10 ml-10 mb-5">

                    <h1 className="text-xl font-poppins font-semibold text-left">
                        Chatbot Íris
                    </h1>
{/* 
                    <p style={{ color: "#9291A5" }}>
                        Íris
                    </p> */}

                </div>

            </div>

            {/* DIVISÓRIA */}

            <div
                className="
                    relative
                    shrink-0
                    after:absolute
                    after:bottom-0
                    after:left-1/2
                    after:translate-x-[-50%]
                    after:w-[94%]
                    after:h-[1px]
                    after:bg-gray-200
                    after:shadow-[0_2px_4px_rgba(0,0,0,0.05)]
                    bg-white
                "
            />

            {/* CONTEÚDO */}

            <div
                className="
                    flex
                    flex-col
                    justify-between
                    flex-1
                    p-10
                    min-h-0
                "
            >

                <div
                    className="
                        flex-1
                        pr-2
                        min-h-0
                        overflow-y-auto
                    "
                >

                    {messages.length === 0 && (

                        <>
                            <div className="flex flex-col gap-5">

                                <SuggestionBox
                                    text="Quais disciplinas apresentam maior risco de evasão?"
                                    onClick={sendMessage}
                                />

                                <SuggestionBox
                                    text="Existe relação entre engajamento e desempenho acadêmico?"
                                    onClick={sendMessage}
                                />

                                <SuggestionBox
                                    text="Quais cursos possuem desempenho abaixo da média institucional?"
                                    onClick={sendMessage}
                                />

                            </div>

                            <div className="flex justify-end mt-8 mb-8 pr-6">
                                <div className="flex items-center gap-3">
                                    <Sparkles
                                        size={20}
                                        className="text-[#C5C4D3]"
                                    />

                                    <p className="text-[18px] font-medium text-[#C5C4D3]">
                                        Sugestões
                                    </p>
                                </div>
                            </div>
                        </>

                    )}

                    <div className="flex flex-col gap-5">

                        {messages.map((message) => (

                            <div
                                key={message.id}
                                className={`
                                    flex
                                    ${message.sender === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                    }
                                `}
                            >

                                <div
                                    className={`
                                        max-w-[85%]
                                        rounded-[28px]
                                        px-6
                                        py-5
                                        text-[15px]
                                        leading-6
                                        shadow-sm
                                        ${message.sender === "user"
                                            ? "bg-[#4353B3] text-white"
                                            : "bg-[#4C5A73] text-white"
                                        }
                                    `}
                                >

                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        ol: ({ children }) => (
                                            <ol className="list-decimal pl-5 space-y-2">
                                                {children}
                                            </ol>
                                        ),
                                        ul: ({ children }) => (
                                            <ul className="list-disc pl-5 space-y-2">
                                                {children}
                                            </ul>
                                        ),
                                        p: ({ children }) => (
                                            <p className="mb-2">
                                                {children}
                                            </p>
                                        )
                                    }}
                                >
                                    {message.text}
                                </ReactMarkdown>

                                </div>

                            </div>

                        ))}

                        {isTyping && (

                            <div className="flex justify-start">

                                <div
                                    className="
                                        bg-[#4C5A73]
                                        rounded-[28px]
                                        px-6
                                        py-5
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >

                                    <div className="w-2 h-2 rounded-full bg-white animate-bounce" />

                                    <div
                                        className="
                                            w-2
                                            h-2
                                            rounded-full
                                            bg-white
                                            animate-bounce
                                            [animation-delay:0.2s]
                                        "
                                    />

                                    <div
                                        className="
                                            w-2
                                            h-2
                                            rounded-full
                                            bg-white
                                            animate-bounce
                                            [animation-delay:0.4s]
                                        "
                                    />

                                </div>

                            </div>

                        )}

                    </div>

                </div>

                <div className="mt-8 shrink-0">

                    <div className="w-full h-[1px] bg-[#ECECF4] mb-6" />

                    <div className="flex items-center gap-4">

                        <input
                            value={input}
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage(input);
                                }
                            }}
                            placeholder="Escreva uma pergunta..."
                            className="
                                flex-1
                                h-14
                                rounded-[20px]
                                bg-[#F4F4F7]
                                px-6
                                text-[15px]
                                outline-none
                                placeholder:text-[#AAA8BC]
                            "
                        />

                        <button
                            onClick={() =>
                                sendMessage(input)
                            }
                            className="
                                w-14
                                h-14
                                rounded-[18px]
                                bg-[#4353B3]
                                flex
                                items-center
                                justify-center
                                text-white
                                transition-all
                                hover:opacity-90
                            "
                        >

                            <ArrowRight size={22} />

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}