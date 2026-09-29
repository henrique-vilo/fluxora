import { AppSidebar } from "@/components/app-sidebar"
import { ChartBarInteractive } from "@/components/chart-bar-interactive"
import { ChartPieLegend } from "@/components/chart-pie-legend"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "@/data/data.json";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="flex flex-col lg:flex-row gap-5 lg:gap-0">
                <div className="w-full h-auto px-4 lg:px-6">
                  <ChartBarInteractive data={data} />
                </div>
                <div className="w-full h-auto px-4 lg:px-6">
                  <ChartPieLegend className="w-full h-auto" data={data} />
                </div>
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}