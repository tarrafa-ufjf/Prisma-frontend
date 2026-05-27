"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/tabela";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loading from "../ui/loading";

interface Column {
  label: string | React.ReactNode;
  name: string;
  cell?: (row: any) => React.ReactNode;
  options?: {
    sort?: boolean;
    headerClassName?: string;
    cellClassName?: string;
    sticky?: boolean;
  };
}

interface DataTableProps {
  rowsPerPage: number;
  data: any[];
  columns: Column[];
  searchTerm: string;
  isTutor?: boolean;
}

const normalizeString = (str: string | undefined | null) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const formatCellValue = (value: any, locale: string) => {
  if (typeof value === "number") {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  return value;
};

const DataTable: React.FC<DataTableProps> = ({
  rowsPerPage,
  data,
  columns,
  searchTerm,
}) => {
  const t = useTranslations("Tables");
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      normalizeString(String(value)).includes(normalizeString(searchTerm))
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      buttons.push(1);
      if (startPage > 2) buttons.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons.push("...");
      buttons.push(totalPages);
    }

    return buttons;
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            {columns.map((column, idx) => (
              <TableHead
                key={idx}
                className={`min-w-40 ${column.options?.headerClassName || ""} ${
                  column.options?.sticky
                    ? "sticky left-0 z-40 bg-inherit font-semibold text-left pl-6"
                    : "relative text-sm/tight text-center"
                }`}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            currentData.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="odd:bg-white even:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={`transition-colors px-6 ${
                      column.options?.cellClassName || ""
                    } ${
                      column.options?.sticky
                        ? "sticky bg-inherit left-0 z-30 shadow-cell font-medium text-left pl-6 border-r-[1.5px] border-gray-100"
                        : ""
                    }`}
                  >
                    {column.cell
                      ? column.cell(row)
                      : formatCellValue(row[column.name], locale)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-7">
                <Loading>{t("loadingData")}</Loading>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between p-2 text-sm text-zinc-500 font-medium z-50 bg-white">
        <div className="flex gap-2 font-medium">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="rounded-lg border-1 w-7 h-7 flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 transition-colors focus:text-white focus:outline-none focus:border-[#374DAA] focus:bg-[#374DAA]"
            >
              <FaChevronLeft className="text-xs" />
            </button>
          )}
          {renderPaginationButtons().map((page, i) =>
            typeof page === "number" ? (
              <button
                key={i}
                onClick={() => setCurrentPage(page)}
                className={`rounded-lg text-center justify-center border-1 w-7 h-7 hover:cursor-pointer hover:bg-gray-100 transition-colors focus:text-white focus:outline-none focus:border-[#374DAA] focus:bg-[#374DAA] ${
                  currentPage === page
                    ? "text-white border-[#374DAA] bg-[#374DAA]"
                    : ""
                }`}
              >
                {page}
              </button>
            ) : (
              <span
                key={i}
                className="w-7 h-7 flex items-center justify-center"
              >
                {page}
              </span>
            ),
          )}

          {currentPage < totalPages && (
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="rounded-lg border-1 w-7 h-7 flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 transition-colors focus:text-white focus:outline-none focus:border-[#374DAA] focus:bg-[#374DAA]"
            >
              <FaChevronRight className="text-xs" />
            </button>
          )}
        </div>
        <span>
          {t("showingEntries", {
            range:
              filteredData.length === 0
                ? "0 - 0"
                : `${(currentPage - 1) * rowsPerPage + 1} - ${Math.min(
                    currentPage * rowsPerPage,
                    filteredData.length,
                  )}`,
            total: filteredData.length,
          })}
        </span>
      </div>
    </div>
  );
};

export default DataTable;
