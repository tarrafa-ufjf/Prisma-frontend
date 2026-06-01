"use client";

import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import Table from "./table";
import { useError } from "@/hooks/useError";
import type { BaseEntity } from "@/components/template/table-types";
import { useTranslations } from "next-intl";

interface Props {
  id: number;
}

interface DataTable {
  channels: Record<string, string>[];
  id: number;
  message: string;
}

export default function TableComponent({ id }: Props) {
  const t = useTranslations("Tutors.interactionChannels");
  const [data, setData] = useState<DataTable | null>(null);
  const error = useError();

  useEffect(() => {
    async function fetch() {
      try {
        error.clear();
        const response = await api.get(
          `analysis/tutors/subject/${id}/interaction_channels`,
        );
        setData(response.data.data.subject);
      } catch (err) {
        error.setError(t("fetchError"));
        console.error("Erro ao buscar indicadores: ", err);
      }
    }
    fetch();
  }, [id, error.clear, error.setError, t]);

  const filter_forum_name = (texto: string): string => {
    const regex = new RegExp(`[${"-"}]`, "g");
    return texto.replace(regex, "");
  };

  const new_data_base_entity = (data: Record<string, string>[]) => {
    let new_data: BaseEntity[] = [];
    data.forEach((value) => {
      const new_value: BaseEntity = {
        id: Number(value.forum_id),
        forum_name: filter_forum_name(value.forum_name),
        mensagens_alunos: value.mensagens_alunos,
        mensagens_total: value.mensagens_total,
        mensagens_tutores: value.mensagens_tutores,
      };
      new_data.push(new_value);
    });
    return new_data;
  };

  const new_data = new_data_base_entity(data?.channels ?? []);

  return (
    <div className="Box2 overflow-hidden flex flex-col">
      <div className="mb-5 flex-shrink-0">
        <div className="maincurso">
          <div className="mt-10 ml-10 mb-5">
            <h1 className="text-xl font-poppins font-semibold text-left">
              {t("title")}
            </h1>
            <p style={{ color: "#9291A5" }}>{t("subtitle")}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-0 px-5 pb-5">
        <Table
          title={""}
          data={new_data}
          data_keys={{
            keys: [
              "forum_name",
              "mensagens_alunos",
              "mensagens_tutores",
              "mensagens_total",
            ],
            headers: [
              t("headers.channel"),
              t("headers.studentMessages"),
              t("headers.tutorMessages"),
              t("headers.totalMessages"),
            ],
          }}
          actions={[]}
        />
      </div>
    </div>
  );
}
