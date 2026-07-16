interface BoxTemplateProps {
    title: string,
    sub_title: string
    children: React.ReactNode
}

export default function BoxTemplate({ title, sub_title, children }: BoxTemplateProps) {
    return (
        <div className="Box">
            <div className="Boxcursopequeno">
                <div className="mt-10 ml-10 mb-5">
                    <h1 className="text-xl font-poppins font-semibold text-left">{title}</h1>
                    <p style={{ color: "#9291A5" }}>{sub_title}</p>
                </div>
            </div>
            <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 after:shadow-[0_2px_4px_rgba(0,0,0,0.05)] bg-white" />
            <div className='m-10'>
                <div className="bg-white rounded-lg p-4 space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
};
