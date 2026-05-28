import GraficoComp from './GraficoComp'
import { useTranslations } from 'next-intl'
interface GraficoProps {
    graph_data: UsageByModule[]
}

type ItemLegenda = {
    id: string
    label: string
    color: string
    value: number
}

const palette = [
    "#2277b0",
    "#fe7f0e",
    "#2c9f2c",
    "#d52726",
    "#9466c0",
    "#8e544d",
    "#e576c2",
    "#7f7f7f",
    "#bcbd22",
    "#17bece",
];

function generateExtraColor(index: number) {
  const hue = (index * 137.508) % 360
  return `hsl(${hue}, 65%, 50%)`
}

export default function Grafico({ graph_data }: GraficoProps) {
    const t = useTranslations('Courses.charts.activities')
    const legenda: ItemLegenda[] = []
    graph_data.forEach((data, index) => {
    const color =
      index < palette.length ? palette[index] : generateExtraColor(index)

    legenda.push({
      id: data.modulo,
      label: data.modulo,
      color,
      value: Number(data.pct_modulo_no_curso),
    })
  })
    return (
        <div className="Box my-10 p-1.5">
            <div className="Boxcursopequeno">
                <div className="mt-10 ml-10 mb-5">
                    <h1 className="text-xl font-poppins font-semibold text-left">{t('title')}</h1>
                    <p style={{ color: "#9291A5" }}>{t('subtitle')}</p>
                </div>
            </div>
            <div className="relative after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[90%] after:h-[1px] after:bg-gray-200 bg-white" />

            <GraficoComp legenda={legenda} />

            <div className="flex justify-center flex-wrap gap-4 mb-4 px-10">
                <p
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginTop: '1rem',
                    }}
                >
                    {legenda.map((item) => (
                        <span
                            key={item.label}
                            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                        >
                            <span
                                style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: '50%',
                                    backgroundColor: item.color,
                                    display: 'inline-block',
                                }}
                            />
                            <span style={{ color: '#4a4a4a' }}>{item.label}</span>
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
}
