import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import type { DimensionScore } from '../types'

interface ResultsChartProps {
  dimensions: DimensionScore[]
}

type BarLabelProps = {
  x?: number | string
  y?: number | string
  width?: number | string
  index?: number
  value?: number | string
}

function BarTooltipBubble({ x, y, width, value }: BarLabelProps) {
  if (x == null || y == null || width == null) return null
  const cx = Number(x) + Number(width) / 2
  const top = Number(y) - 8

  return (
    <foreignObject
      x={cx - 56}
      y={top - 40}
      width={112}
      height={36}
      className="overflow-visible"
      style={{ pointerEvents: 'none' }}
    >
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-sm shadow-lg">
        <p className="text-slate-600">
          Wynik:{' '}
          <span className="font-semibold tabular-nums text-[#1a2f52]">{value}%</span>
        </p>
      </div>
    </foreignObject>
  )
}

export function ResultsChart({ dimensions }: ResultsChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const data = dimensions.map((d) => ({
    name: d.label,
    wynik: d.percent,
  }))

  return (
    <div className="card-surface h-72 w-full p-4 sm:h-80">
      <h3 className="mb-4 text-sm font-semibold text-slate-700">
        Wyniki cząstkowe według wymiarów
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{ top: 56, right: 8, left: 0, bottom: 8 }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{
              fill: '#0f172a',
              fontSize: 12,
              fontWeight: 600,
            }}
            axisLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#cbd5e1' }}
            unit="%"
          />
          <Bar
            dataKey="wynik"
            fill="#2a3d5f"
            radius={[6, 6, 0, 0]}
            maxBarSize={56}
            activeBar={{ fill: '#1a2f52' }}
            isAnimationActive={false}
            cursor="pointer"
            onMouseEnter={(_entry, index) => setActiveIndex(index)}
          >
            <LabelList
              dataKey="wynik"
              content={(props) => {
                const bar = props as BarLabelProps
                if (activeIndex === null || bar.index !== activeIndex) return null
                const row = data[activeIndex]
                if (!row) return null
                return <BarTooltipBubble {...bar} />
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
