import TableHeader from "./table-header";
import TableRow from "./table-row";
import TableCell from "./table-cell";
import { Info } from "lucide-react";
import { BaseEntity, TableProps } from "@/components/template/table-types";
import Button from "@/components/ui/button";

export default function Table<T extends BaseEntity>({
  title,
  data,
  data_keys,
  actions = [],
  empty_message = (
    <span className="flex gap-2">
      <Info />
      Nenhum item encontrado
    </span>
  ),
}: TableProps<T>) {
  return (
    <div className="overflow-hidden flex flex-col h-full">
      <div className="flex-shrink-0 overflow-x-auto">
        <table className="w-full font-semibold text-zinc-500 border-y border-[#dfe0e2] table-fixed">
          <thead>
            <tr>
              {data_keys.headers.map((header, index) => (
                <TableHeader key={index}>{header}</TableHeader>
              ))}
              {actions.length > 0 && (
                <TableHeader>Ações</TableHeader>
              )}
            </tr>
          </thead>
        </table>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-auto border-b border-[#dfe0e2]">
        <table className="w-full text-black table-fixed">
          <tbody>
            {data.length > 0 ? (
              data.map((data, index) => (
                <TableRow key={index}>
                  {data_keys.keys.map((key, i) => (
                    <TableCell key={i}>
                      <div
                        className="flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: String(data[key]) }}
                      />
                    </TableCell>
                  ))}
                  {actions.length > 0 && (
                    <TableCell>
                      <div className="flex flex-col md:flex-row gap-1.5 p-2">
                        {actions.map((action, index) => (
                          <Button key={index} href={"/"}>
                            {action.content}
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={data_keys.headers.length + 1}
                  className="text-gray-400"
                >
                  <div className="flex items-center-center justify-center">
                    {empty_message}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
