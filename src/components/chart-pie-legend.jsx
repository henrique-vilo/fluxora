"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a legend"

import data from "@/data/data.json";

const estoqueNormal = data.filter((dado) => dado.status == "Normal");
const estoqueBaixo = data.filter((dado) => dado.status == "Low stock");
const semEstoque = data.filter((dado) => dado.status == "Out of stock");

const chartData = [
  { status: "normal", quantity: estoqueNormal.length, fill: "var(--color-normal)" },
  { status: "low", quantity: estoqueBaixo.length, fill: "var(--color-low)" },
  { status: "none", quantity: semEstoque.length, fill: "var(--color-none)" },
]

const chartConfig = {
  quantity: {
    label: "Quantity",
  },
  normal: {
    label: "Regular Stock",
    color: "var(--chart-1)",
  },
  low: {
    label: "Low Stock",
    color: "var(--chart-3)",
  },
  none: {
    label: "Out of Stock",
    color: "var(--chart-5)",
  },
}

export function ChartPieLegend() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stock by Status</CardTitle>
        <CardDescription>The distribution of different status of stock</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-70 w-51/100 max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="status" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="quantity"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="var(--foreground)"
                  >
                    {payload.quantity}
                  </text>
                )
              }}
            />

            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}