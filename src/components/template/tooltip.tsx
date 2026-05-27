'use client';

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { FaInfoCircle, FaTimes } from "react-icons/fa";

type TooltipIndicatorProps = {
  message: string | null;
};

export function Tooltip({ message }: TooltipIndicatorProps) {
  const t = useTranslations("Tooltip");
  const [visible, setVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Função para fechar o modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        visible &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    // Função para fechar ao pressionar ESC
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && visible) {
        setVisible(false);
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      // Impede o scroll da página quando o modal está aberto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [visible]);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="cursor-pointer text-zinc-500 hover:text-zinc-700 border-none focus:outline-none transition-colors duration-200 hover:scale-110 transform"
      >
        <FaInfoCircle size={16} />
      </button>

      {visible &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Overlay escuro */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
              ref={modalRef}
              className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-lg w-full max-h-[80vh] overflow-y-auto transform transition-all duration-300 ease-out scale-100"
            >
              {/* Header do Modal */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FaInfoCircle className="text-blue-500" />
                  {t("title")}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:cursor-pointer hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-full"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Conteúdo do Modal */}
              <div className="p-6">
                <div className="text-gray-700 leading-relaxed">
                  <p className="text-base">{message}</p>
                </div>
              </div>

              {/* Footer do Modal */}
              <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:cursor-pointer hover:bg-blue-600 transition-colors duration-200 font-medium"
                >
                  {t("ok")}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
