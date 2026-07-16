import { useTranslations } from "next-intl";

interface GeneralDataProps {
  tutor: any;
}

export default function GeneralData({ tutor }: GeneralDataProps) {
  const t = useTranslations("Tutors.detail.generalData");

  return (
    <div className="Box3 p-6 rounded-lg border border-gray-200 shadow-sm">
      <h1 className="text-2xl font-semibold text-left mb-6 pb-4 border-b border-gray-200">
        {t("title")}
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col ml-4 mr-4">
          <div className="flex items-center mb-4">
            <p className="text-sm font-medium w-24">E-mail</p>
            <p className="text-sm bg-gray-100 rounded-md py-2 px-4 flex-1">
              {tutor.email ? tutor.email : t("notInformed")}
            </p>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-sm font-medium w-24">{t("course")}</p>
            <p className="text-sm bg-gray-100 rounded-md py-2 px-4 flex-1">
              {tutor.degree_program ? tutor.degree_program : t("notInformed")}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-sm font-medium w-24">{t("city")}</p>
            <p className="text-sm bg-gray-100 rounded-md py-2 px-4 flex-1">
              {tutor.city ? tutor.city : t("notInformed")}
            </p>
          </div>
        </div>
        <div className="flex flex-col mr-4">
          <div className="flex items-center mb-4">
            <p className="text-sm font-medium w-32">{t("group")}</p>
            <p className="text-sm bg-gray-100 rounded-md py-2 px-4 flex-1">
              {tutor.tutor_groups ? tutor.tutor_groups : t("notInformed")}
            </p>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-sm font-medium w-32">{t("firstAccess")}</p>
            <p className="text-sm bg-gray-100 rounded-md py-2 px-4 flex-1">
              {tutor.first_access_moodle ? tutor.first_access_moodle : t("notInformed")}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-sm font-medium w-32">{t("lastAccess")}</p>
            <p className="text-sm bg-gray-100 rounded-md py-2 px-4 flex-1">
              {tutor.last_access_subject ? tutor.last_access_subject : t("notInformed")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

