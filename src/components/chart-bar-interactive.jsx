"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import data from "@/data/data.json"

export const description = "Product quantity by category"

const categoryCount = data.reduce((acc, item) => {
  const category = item.category

  if (!acc[category]) {
    acc[category] = 0
  }

  acc[category]++

  return acc
}, {})

const chartData = Object.entries(categoryCount).map(
  ([category, qtd]) => ({
    category,
    qtd,
  })
)

const chartConfig = {
  qtd: {
    label: "Products",
    color: "var(--chart-1)",
  },
}

export function ChartBarInteractive() {
  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0!">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3">
          <CardTitle>Products by Category</CardTitle>

          <CardDescription>
            Number of products registered in each category
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="qtd"
                />
              }
            />

            <Bar
              dataKey="qtd"
              fill="var(--color-qtd)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}