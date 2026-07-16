
interface PageTemplateProps {
    title: string
    subTitle: string
    children: React.ReactNode
    courseInfo?: {
        period: string,
        shortName: string
    }
}

export default function PageTemplate({ title, subTitle, children, courseInfo }: PageTemplateProps) {
    return (
        <div className="flex-1 flex justify-center items-center pl-[240px] mb-3">
            <div className="BoxCurso">
                <div className="flex flex-row justify-between items-start w-full mb-2">
                    <div className="flex flex-col items-start">
                        <h1 className="text-xl font-poppins font-semibold text-left">{title}</h1>

                        <p style={{ color: '#374DAA' }} className="text-left text-xl font-semibold">
                            {subTitle}
                        </p>
                    </div>
                    {courseInfo && (
                        <div className="flex flex-col items-end">
                            <p className="text-sm text-right">{courseInfo.period}</p>
                            <p className="text-xl text-right font-poppins font-semibold">
                                {courseInfo.shortName}
                            </p>
                        </div>
                    )}
                </div>
                <div>
                    <div className="center-wrapper flex flex-col justify-between gap-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
