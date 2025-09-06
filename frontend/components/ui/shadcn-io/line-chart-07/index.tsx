"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Line chart showing heavy metal pollution trends"

const chartData = [
  { year: "2019", concentration: 20 },
  { year: "2020", concentration: 35 },
  { year: "2021", concentration: 50 },
  { year: "2022", concentration: 45 },
  { year: "2023", concentration: 60 },
]

const chartConfig = {
  concentration: {
    label: "Pollution Level (ppm)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartLineDotsCustom() {
  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">Pollution Trends Over Time</h3>
        <p className="text-sm text-muted-foreground">Average heavy metal concentration (2019–2023)</p>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ChartContainer config={chartConfig} className="w-full h-[250px]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="concentration"
              type="natural"
              stroke="var(--color-concentration)"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ChartContainer>
      </div>
      <div className="flex flex-col gap-1 text-sm text-center mt-4">
        <div className="flex items-center justify-center gap-2 leading-none font-medium">
          Pollution levels rising steadily <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center justify-center gap-2 leading-none">
          5-year pollution monitoring data
        </div>
      </div>
    </div>
  )
}
