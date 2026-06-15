'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ResponsiveBar = dynamic(
  () => import('@nivo/bar').then(mod => mod.ResponsiveBar),
  { ssr: false }
);

export type ItemLegenda = {
  categoria: string,
  valor: number,
}

interface GraficoProps {
  data: ItemLegenda[]
}

export default function Grafico({ data }: GraficoProps) {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={['valor']}
        indexBy="categoria"
        margin={{ top: 50, right: 30, bottom: 50, left: 50 }}
        padding={0.4}
        layout="vertical"
        axisBottom={{
          tickSize: 5,
          tickPadding: 10,
          legendPosition: 'middle',
          legendOffset: 40,
        }}

        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors="#4C6CA8"
        borderRadius={6}
        enableGridY={true}
        isInteractive={true} //tooltip
        axisLeft={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -40,
        }}

        labelTextColor="#ffffff"
        labelSkipWidth={20}
        labelSkipHeight={20}
        theme={{
          labels: {
            text: {
              fontSize: 20,
              fontWeight: 'bold',
            },
          },
          tooltip: {
            container: {
              fontSize: '14px',
            },
          },
        }}

      />
    </div>
  )
}

