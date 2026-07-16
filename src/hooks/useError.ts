'use client';

import ErrorMessage from "@/components/ui/error-message";
import { useState, useCallback } from "react";
import type { ReactElement } from "react";

/**
 * Tipo de retorno do hook useError
 */
type ErrorHook = {
    /** Mensagem de erro atual ou null se não há erro */
    message: string | null;
    /** Função para limpar o erro atual */
    clear: () => void;
    /** Função para definir uma nova mensagem de erro */
    setError: (new_value: string) => void;
    /** Função que renderiza o componente de erro */
    renderError: () => ReactElement;
    /** Indica se há um erro ativo */
    hasError: boolean;
}

/**
 * Hook personalizado para gerenciar estados de erro em componentes React
 * 
 * Este hook fornece uma interface simples para gerenciar erros em componentes,
 * incluindo funções para definir, limpar e renderizar erros de forma consistente.
 * 
 * @returns {ErrorHook} Objeto contendo o estado do erro e funções para manipulá-lo
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const error = useError();
 *   
 *   const fetchData = async () => {
 *     try {
 *       error.clear(); // Limpa erros anteriores
 *       const data = await api.get('/data');
 *       // processa dados...
 *     } catch (err) {
 *       error.setError('Erro ao carregar dados');
 *     }
 *   };
 *   
 *   return (
 *     <div>
 *       {error.hasError ? (
 *         error.renderError()
 *       ) : (
 *         <div>Conteúdo normal</div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useError(): ErrorHook {
    // Estado interno para armazenar a mensagem de erro
    const [error, setErrorState] = useState<string | null>(null)

    /**
     * Define uma nova mensagem de erro
     * @param new_value - A mensagem de erro a ser definida
     */
    const setError = useCallback((new_value: string) => {
        setErrorState(new_value)
    }, [])

    /**
     * Limpa o erro atual, definindo-o como null
     */
    const clear = useCallback(() => {
        setErrorState(null)
    }, [])

    /**
     * Renderiza o componente de erro com a mensagem atual
     * @returns Elemento React com a mensagem de erro ou componente vazio se não há erro
     */
    const renderError = useCallback(() => {
        if (!error) return ErrorMessage({ children: null });
        return ErrorMessage({ children: error })
    }, [error])

    return {
        message: error,
        clear,
        setError,
        renderError,
        hasError: error !== null
    }
}
