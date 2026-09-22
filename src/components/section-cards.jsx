"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

import data from "@/data/data.json"



export function SectionCards() {

  const qtdMateriaisTotais = data.length;
  const estoqueNormal = data.filter((dado) => dado.status == "Normal");
  const estoqueBaixo = data.filter((dado) => dado.status == "Low stock");
  const semEstoque = data.filter((dado) => dado.status == "Out of stock");

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card flex justify-center items-center">
          <CardDescription className="text-4xl">All Materials</CardDescription>
          <CardTitle className="text-5xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {qtdMateriaisTotais}
          </CardTitle>
      </Card>
      <Card className="@container/card flex justify-center items-center">
          <CardDescription className="text-4xl">Normal Stock</CardDescription>
          <CardTitle className="text-5xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {estoqueNormal.length}
          </CardTitle>
      </Card>
      <Card className="@container/card flex justify-center items-center">
          <CardDescription className="text-4xl">Low Stock</CardDescription>
          <CardTitle className="text-5xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {estoqueBaixo.length}
          </CardTitle>
      </Card>
      <Card className="@container/card flex justify-center items-center">
          <CardDescription className="text-4xl">No Stock</CardDescription>
          <CardTitle className="text-5xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {semEstoque.length}
          </CardTitle>
      </Card>
    </div>
  )
}
