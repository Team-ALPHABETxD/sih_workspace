"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Radar chart showing heavy metal levels"

const chartData = [
  { metal: "Lead", level: 65 },
  { metal: "Mercury", level: 40 },
  { metal: "Cadmium", level: 55 },
  { metal: "Arsenic", level: 30 },
  { metal: "Chromium", level: 70 },
]

const chartConfig = {
  level: {
    label: "Concentration",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartRadarGridCircleFill() {
  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold">Heavy Metal Levels</h3>
        <p className="text-sm text-muted-foreground">
          Pollution intensity across different metals
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square w-72 h-72"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid
              className="fill-[var(--color-level)] opacity-20"
              gridType="circle"
            />
            <PolarAngleAxis dataKey="metal" />
            <Radar
              dataKey="level"
              fill="var(--color-level)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </div>
      <div className="flex flex-col gap-1 text-sm text-center mt-2">
        <div className="flex items-center justify-center gap-2 leading-none font-medium">
          Lead & Chromium show the highest concentration <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center justify-center gap-2 leading-none">
          Water sample analysis, 2023
        </div>
      </div>
    </div>
  )
}
