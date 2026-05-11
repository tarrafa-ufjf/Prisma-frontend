import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ScrollableTabsProps<T extends string> {
  tabs: T[];
  activeTab: T;
  setTab: (tab: T) => void;
  setAlunos?: (alunos: any[]) => void;
  setTutores?: (tutores: any[]) => void;
}

function ScrollableTabs<T extends string>({
  tabs,
  activeTab,
  setTab,
  setAlunos,
  setTutores
}: ScrollableTabsProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });

  const onTabClick = (tab: T) => {
    setTab(tab);
    setAlunos?.([]);
    setTutores?.([]);
  };

  return (
    <div className="flex justify-between items-center gap-2 mb-2">
      <div className="flex items-center gap-1 max-w-full overflow-hidden">
        {tabs.length > 4 && (
          <button
            onClick={scrollLeft}
            className="mr-3 rounded-lg border border-gray-300 min-w-7 h-7 flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <FaChevronLeft className="h-3 w-3 text-gray-500" />
          </button>
        )}

        <div ref={scrollRef} className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => onTabClick(tab)}
              className={`flex-shrink-0 rounded-lg px-4 py-2 border-2 transition-colors cursor-pointer ${
                activeTab === tab ? 'text-white bg-[#374DAA] border-[#374DAA]' : 'text-gray-800 bg-white border-gray-300 hover:bg-gray-100'
              }`}
            >
              {/* Garantindo que o T renderize como string */}
              {String(tab)}
            </button>
          ))}
        </div>

        {tabs.length > 4 && (
          <button
            onClick={scrollRight}
            className="mx-3 rounded-lg border border-gray-300 min-w-7 h-7 flex items-center justify-center hover:cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <FaChevronRight className="h-3 w-3 text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ScrollableTabs;