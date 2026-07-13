'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ArrowRight, MessageSquarePlus, RefreshCw, Trash2 } from "lucide-react";
import SuggestionBox from "./Sugestões";
import { api } from "@/utils/api";
import { useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MessageSender = "user" | "bot";

interface ConversationSummary {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
}

interface BackendMessage {
    id: number;
    conversation_id: number;
    role: "user" | "assistant";
    content: string;
    rewritten_question: string | null;
    sql: string | null;
    result_json: {
        rows?: Record<string, unknown>[];
        row_count?: number;
        truncated?: boolean;
    } | null;
    metadata: Record<string, unknown> | null;
    vega?: unknown;
    created_at: string;
}

interface Message {
    id: number;
    text: string;
    sender: MessageSender;
    rewrittenQuestion?: string | null;
    sql?: string | null;
    rows?: Record<string, unknown>[];
    vega?: unknown;
}

interface ChatbotPageProps {
    setResponse: (response: any) => void;
}

const lastConversationStorageKey = "chatbot:lastConversationId";

function getMessageRows(resultJson: BackendMessage["result_json"]) {
    if (!resultJson?.rows || !Array.isArray(resultJson.rows)) {
        return [];
    }

    return resultJson.rows;
}

function getStoredVega(message: BackendMessage) {
    if (message.vega) {
        return message.vega;
    }

    if (message.metadata && "vega" in message.metadata) {
        return message.metadata.vega;
    }

    return undefined;
}

function formatCellValue(value: unknown) {
    if (value === null || value === undefined) {
        return "-";
    }

    if (typeof value === "object") {
        return JSON.stringify(value);
    }

    return String(value);
}

export default function ChatbotPage({
    setResponse
}: ChatbotPageProps) {

    const t = useTranslations("Chatbot");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversations, setConversations] = useState<ConversationSummary[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoadingConversations, setIsLoadingConversations] = useState(true);
    const [isLoadingConversation, setIsLoadingConversation] = useState(false);
    const [deletingConversationId, setDeletingConversationId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const suggestions = [
        t("suggestions.dropoutRisk"),
        t("suggestions.engagementPerformance"),
        t("suggestions.belowAverageCourses")
    ];

    const handleUnauthorized = useCallback((error: unknown) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            window.location.reload();
            return true;
        }

        return false;
    }, []);

    const sortedConversations = useMemo(() => {
        return [...conversations].sort((a, b) => {
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });
    }, [conversations]);

    const activeConversation = sortedConversations.find((conversation) => {
        return conversation.id === activeConversationId;
    });

    const loadConversation = useCallback(async (conversationId: number) => {
        setIsLoadingConversation(true);
        setErrorMessage(null);

        try {
            const response = await api.get(`/chatbot/conversations/${conversationId}`);
            const conversation = response.data.conversation;
            const loadedMessages = (conversation.messages ?? []).map((message: BackendMessage) => ({
                id: message.id,
                text: message.content,
                sender: message.role === "user" ? "user" : "bot",
                rewrittenQuestion: message.rewritten_question,
                sql: message.sql,
                rows: getMessageRows(message.result_json),
                vega: getStoredVega(message)
            }));
            const lastVegaMessage = [...loadedMessages].reverse().find((message: Message) => {
                return message.sender === "bot" && message.vega;
            });

            setActiveConversationId(conversation.id);
            setMessages(loadedMessages);
            setResponse(lastVegaMessage ? { vega: lastVegaMessage.vega } : null);
            localStorage.setItem(lastConversationStorageKey, String(conversation.id));
        } catch (error) {
            if (handleUnauthorized(error)) {
                return;
            }

            setErrorMessage(t("errors.loadConversation"));
        } finally {
            setIsLoadingConversation(false);
        }
    }, [handleUnauthorized, setResponse, t]);

    const loadConversations = useCallback(async (preferredConversationId?: number | null) => {
        setIsLoadingConversations(true);
        setErrorMessage(null);

        try {
            const response = await api.get("/chatbot/conversations");
            const nextConversations = response.data.conversations ?? [];
            const sortedNextConversations = [...nextConversations].sort((a, b) => {
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
            });
            const storedConversationId = Number(localStorage.getItem(lastConversationStorageKey));
            const nextActiveId =
                preferredConversationId ??
                (Number.isFinite(storedConversationId) && storedConversationId > 0 ? storedConversationId : null) ??
                sortedNextConversations[0]?.id ??
                null;
            const canOpenNextActive = sortedNextConversations.some((conversation) => {
                return conversation.id === nextActiveId;
            });

            setConversations(nextConversations);

            if (nextActiveId && canOpenNextActive) {
                await loadConversation(nextActiveId);
            } else {
                setActiveConversationId(null);
                setMessages([]);
                setResponse(null);
            }
        } catch (error) {
            if (handleUnauthorized(error)) {
                return;
            }

            setErrorMessage(t("errors.loadConversations"));
        } finally {
            setIsLoadingConversations(false);
        }
    }, [handleUnauthorized, loadConversation, setResponse, t]);

    useEffect(() => {
        loadConversations();
    }, [loadConversations]);

    async function askChatbot(question: string) {
        const payload = activeConversationId
            ? { conversation_id: activeConversationId, question }
            : { question };

        const response = await api.post("/chatbot", payload);

        return response.data;
    }

    function startNewConversation() {
        setActiveConversationId(null);
        setMessages([]);
        setErrorMessage(null);
        setResponse(null);
        localStorage.removeItem(lastConversationStorageKey);
    }

    async function deleteConversation(conversationId: number) {
        const conversation = conversations.find((item) => item.id === conversationId);
        const confirmed = window.confirm(
            t("confirmDeleteConversation", {
                title: conversation?.title || t("untitledConversation")
            })
        );

        if (!confirmed) {
            return;
        }

        setDeletingConversationId(conversationId);
        setErrorMessage(null);

        try {
            await api.delete(`/chatbot/conversations/${conversationId}`);

            const remainingConversations = sortedConversations.filter((item) => {
                return item.id !== conversationId;
            });
            const nextActiveConversationId =
                activeConversationId === conversationId
                    ? remainingConversations[0]?.id ?? null
                    : activeConversationId;

            if (activeConversationId === conversationId) {
                if (nextActiveConversationId) {
                    localStorage.setItem(lastConversationStorageKey, String(nextActiveConversationId));
                } else {
                    localStorage.removeItem(lastConversationStorageKey);
                    setMessages([]);
                    setResponse(null);
                }
            }

            await loadConversations(nextActiveConversationId);
        } catch (error) {
            if (handleUnauthorized(error)) {
                return;
            }

            setErrorMessage(t("errors.deleteConversation"));
        } finally {
            setDeletingConversationId(null);
        }
    }

    async function sendMessage(text: string) {
        const trimmedText = text.trim();

        if (!trimmedText || isTyping) {
            return;
        }

        const userMessage: Message = {
            id: Date.now(),
            text: trimmedText,
            sender: "user"
        };

        setMessages((prev) => [
            ...prev,
            userMessage
        ]);

        setInput("");
        setIsTyping(true);
        setErrorMessage(null);

        try {
            const result = await askChatbot(trimmedText);

            if (result.success === false) {
                throw new Error(result.error ?? t("errors.fetch"));
            }

            const nextConversationId = result.conversation_id ?? activeConversationId;

            if (nextConversationId) {
                setActiveConversationId(nextConversationId);
                localStorage.setItem(lastConversationStorageKey, String(nextConversationId));
            }

            setResponse(result);

            const botMessage: Message = {
                id: Date.now() + 1,
                text: result.answer ?? t("emptyAnswer"),
                sender: "bot",
                rewrittenQuestion: result.rewritten_question,
                rows: Array.isArray(result.json) ? result.json : result.json?.rows,
                vega: result.vega
            };

            setMessages((prev) => [
                ...prev,
                botMessage
            ]);

            await loadConversations(nextConversationId);
        } catch (error) {
            if (handleUnauthorized(error)) {
                return;
            }

            const fallbackMessage =
                error instanceof Error
                    ? error.message
                    : t("errors.fetch");

            const botMessage: Message = {
                id: Date.now() + 1,
                text: fallbackMessage,
                sender: "bot"
            };

            setMessages((prev) => [
                ...prev,
                botMessage
            ]);
        } finally {
            setIsTyping(false);
        }
    }

    function renderTable(rows: Record<string, unknown>[]) {
        if (rows.length === 0) {
            return null;
        }

        const columns = Object.keys(rows[0] ?? {});

        if (columns.length === 0) {
            return null;
        }

        return (
            <div className="mt-4 max-h-64 overflow-auto rounded-lg border border-white/20">
                <table className="w-full min-w-max text-left text-xs">
                    <thead className="bg-white/10">
                        <tr>
                            {columns.map((column) => (
                                <th key={column} className="px-3 py-2 font-semibold">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.slice(0, 20).map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-t border-white/10">
                                {columns.map((column) => (
                                    <td key={column} className="px-3 py-2 align-top">
                                        {formatCellValue(row[column])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    function renderMessage(message: Message) {
        const shouldShowRewrittenQuestion =
            message.rewrittenQuestion &&
            message.rewrittenQuestion.trim() &&
            message.rewrittenQuestion.trim() !== message.text.trim();

        return (
            <div
                key={message.id}
                className={`
                    flex
                    ${message.sender === "user" ? "justify-end" : "justify-start"}
                `}
            >
                <div
                    className={`
                        max-w-[88%]
                        rounded-[24px]
                        px-5
                        py-4
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
                                <p className="mb-2 last:mb-0">
                                    {children}
                                </p>
                            )
                        }}
                    >
                        {message.text}
                    </ReactMarkdown>

                    {shouldShowRewrittenQuestion && (
                        <div className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-xs leading-5 text-white/85">
                            <span className="font-semibold">
                                {t("interpretedQuestion")}
                            </span>{" "}
                            {message.rewrittenQuestion}
                        </div>
                    )}

                    {message.rows && renderTable(message.rows)}

                    {message.sql && (
                        <details className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-xs">
                            <summary className="cursor-pointer font-semibold">
                                {t("debugSql")}
                            </summary>
                            <pre className="mt-2 whitespace-pre-wrap break-words">
                                {message.sql}
                            </pre>
                        </details>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div
            className="
                Box
                h-[calc(100vh-48px)]
                overflow-hidden
            "
        >
            <div className="flex h-full min-h-0">
                <aside className="flex w-56 shrink-0 flex-col border-r border-[#ECECF4] bg-[#F8F8FC]">
                    <div className="p-4">
                        <button
                            onClick={startNewConversation}
                            className="
                                flex
                                h-11
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                bg-[#4353B3]
                                px-3
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:opacity-90
                            "
                        >
                            <MessageSquarePlus size={17} />
                            {t("newConversation")}
                        </button>
                    </div>

                    <div className="flex items-center justify-between px-4 pb-3">
                        <h2 className="text-sm font-semibold text-[#4C5A73]">
                            {t("conversationHistory")}
                        </h2>

                        <button
                            onClick={() => loadConversations(activeConversationId)}
                            className="rounded-md p-1 text-[#9291A5] hover:bg-white hover:text-[#4353B3]"
                            title={t("refreshConversations")}
                        >
                            <RefreshCw size={15} />
                        </button>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
                        {isLoadingConversations ? (
                            <p className="px-2 py-3 text-sm text-[#9291A5]">
                                {t("loadingConversations")}
                            </p>
                        ) : sortedConversations.length === 0 ? (
                            <p className="px-2 py-3 text-sm leading-5 text-[#9291A5]">
                                {t("emptyConversations")}
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {sortedConversations.map((conversation) => (
                                    <div
                                        key={conversation.id}
                                        className={`
                                            group
                                            flex
                                            items-start
                                            gap-2
                                            rounded-lg
                                            transition
                                            ${conversation.id === activeConversationId
                                                ? "bg-white shadow-sm"
                                                : "hover:bg-white"
                                            }
                                        `}
                                    >
                                        <button
                                            onClick={() => loadConversation(conversation.id)}
                                            className={`
                                                min-w-0
                                                flex-1
                                                px-3
                                                py-3
                                                text-left
                                                ${conversation.id === activeConversationId
                                                    ? "text-[#4353B3]"
                                                    : "text-[#5F6475]"
                                                }
                                            `}
                                        >
                                            <span className="line-clamp-2 text-sm font-medium leading-5">
                                                {conversation.title || t("untitledConversation")}
                                            </span>
                                            <span className="mt-1 block text-xs text-[#9291A5]">
                                                {new Intl.DateTimeFormat(undefined, {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                }).format(new Date(conversation.updated_at))}
                                            </span>
                                        </button>

                                        <button
                                            onClick={() => deleteConversation(conversation.id)}
                                            disabled={deletingConversationId === conversation.id}
                                            className="
                                                mr-2
                                                mt-2
                                                flex
                                                h-8
                                                w-8
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-md
                                                text-[#9291A5]
                                                opacity-0
                                                transition
                                                hover:bg-red-50
                                                hover:text-red-600
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                                group-hover:opacity-100
                                                focus:opacity-100
                                            "
                                            title={t("deleteConversation")}
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>

                <section className="flex min-w-0 flex-1 flex-col">
                    <div className="maincurso shrink-0">
                        <div className="mt-10 ml-10 mb-5">
                            <h1 className="text-xl font-poppins font-semibold text-left">
                                {activeConversation?.title || t("title")}
                            </h1>
                        </div>
                    </div>

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

                    <div
                        className="
                            flex
                            min-h-0
                            flex-1
                            flex-col
                            justify-between
                            p-8
                        "
                    >
                        {errorMessage && (
                            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                                {errorMessage}
                            </div>
                        )}

                        <div
                            className="
                                min-h-0
                                flex-1
                                overflow-y-auto
                                pr-2
                            "
                        >
                            {isLoadingConversation ? (
                                <div className="flex h-full items-center justify-center text-sm text-[#9291A5]">
                                    {t("loadingConversation")}
                                </div>
                            ) : messages.length === 0 ? (
                                <>
                                    <div className="flex flex-col gap-4">
                                        {suggestions.map((suggestion) => (
                                            <SuggestionBox
                                                key={suggestion}
                                                text={suggestion}
                                                onClick={sendMessage}
                                            />
                                        ))}
                                    </div>

                                    <div className="flex justify-end mt-8 mb-8 pr-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[18px] font-medium text-[#C5C4D3]">
                                                {activeConversationId ? t("emptyConversation") : t("suggestionsTitle")}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col gap-5">
                                    {messages.map(renderMessage)}

                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div
                                                className="
                                                    bg-[#4C5A73]
                                                    rounded-[24px]
                                                    px-6
                                                    py-5
                                                    flex
                                                    items-center
                                                    gap-2
                                                "
                                            >
                                                <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
                                                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                                                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
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
                                    placeholder={t("inputPlaceholder")}
                                    disabled={isLoadingConversation}
                                    className="
                                        flex-1
                                        h-14
                                        rounded-[18px]
                                        bg-[#F4F4F7]
                                        px-6
                                        text-[15px]
                                        outline-none
                                        placeholder:text-[#AAA8BC]
                                        disabled:cursor-not-allowed
                                        disabled:opacity-70
                                    "
                                />

                                <button
                                    onClick={() =>
                                        sendMessage(input)
                                    }
                                    disabled={isTyping || isLoadingConversation}
                                    className="
                                        w-14
                                        h-14
                                        rounded-[16px]
                                        bg-[#4353B3]
                                        flex
                                        items-center
                                        justify-center
                                        text-white
                                        transition-all
                                        hover:opacity-90
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >
                                    <ArrowRight size={22} />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
