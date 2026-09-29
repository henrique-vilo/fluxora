"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  FlexRender,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { GripVerticalIcon, CircleCheckIcon, LoaderIcon, EllipsisVerticalIcon, Columns3Icon, ChevronDownIcon, PlusIcon, ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon, TrendingUpIcon } from "lucide-react"

import dados from "@/data/data.json";

const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
})

const columnHelper = createColumnHelper()

export const schema = z.object({
  id: z.number(),
  code: z.string(),
  material: z.string(),
  category: z.string(),
  unit: z.string(),
  availableQuantity: z.number(),
  minimumStock: z.number(),
  status: z.string(),
});

// Create a separate component for the drag handle
function DragHandle({
  id
}) {
  const { attributes, listeners } = useSortable({
    id,
  })
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}
const columns = columnHelper.columns([
  columnHelper.display({
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  }),

  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected()
          }
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) =>
            row.toggleSelected(!!value)
          }
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor("id", {
    header: "ID",
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.id}
      </span>
    ),
    enableHiding: false,
  }),

  columnHelper.accessor("code", {
    header: "Code",
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.code}
      </span>
    ),
    enableHiding: false,
  }),

  columnHelper.accessor("material", {
    header: "Material",
    cell: ({ row }) => (
      <span>{row.original.material}</span>
    ),
  }),

  columnHelper.accessor("category", {
    header: "Category",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="px-1.5 text-muted-foreground"
      >
        {row.original.category}
      </Badge>
    ),
  }),

  columnHelper.accessor("unit", {
    header: "Unit",
    cell: ({ row }) => (
      <span>{row.original.unit}</span>
    ),
  }),

  columnHelper.accessor("availableQuantity", {
    header: () => (
      <div className="w-full text-right">
        Available Quantity
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.original.availableQuantity}
      </div>
    ),
  }),

  columnHelper.accessor("minimumStock", {
    header: () => (
      <div className="w-full text-right">
        Minimum Stock
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.minimumStock}
      </div>
    ),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status

      return (
        <Badge
          variant={
            status === "Normal"
              ? "default"
              : status === "Low stock"
                ? "secondary"
                : "destructive"
          }
          className="px-1.5"
        >
          {status}
        </Badge>
      )
    },
  }),

  columnHelper.display({
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-open:bg-muted"
              size="icon"
            />
          }
        >
          <EllipsisVerticalIcon />
          <span className="sr-only">Open menu</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
])
function DraggableRow({
  row
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          <FlexRender cell={cell} />
        </TableCell>
      ))}
    </TableRow>
  )
}
export function DataTable({
  data: initialData
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState({})
  const [columnFilters, setColumnFilters] = React.useState([])
  const [sorting, setSorting] = React.useState([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [search, setSearch] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [filteredData, setFilteredData] = React.useState(initialData)
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  React.useEffect(() => {
    const normalizedSearch = search.trim().toLowerCase()

    const result = data.filter((item) => {
      const matchesSearch =
        normalizedSearch === "" ||
        String(item.id).toLowerCase().includes(normalizedSearch) ||
        item.code.toLowerCase().includes(normalizedSearch) ||
        item.material.toLowerCase().includes(normalizedSearch) ||
        item.category.toLowerCase().includes(normalizedSearch) ||
        item.unit.toLowerCase().includes(normalizedSearch) ||
        item.status.toLowerCase().includes(normalizedSearch)

      const matchesCategory =
        categoryFilter === "all" ||
        item.category === categoryFilter

      const matchesStatus =
        statusFilter === "all" ||
        item.status === statusFilter

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      )
    })

    setFilteredData(result)


    setPagination((current) => ({
      ...current,
      pageIndex: 0,
    }))
  }, [data, search, categoryFilter, statusFilter])

  const dataIds = React.useMemo(
    () => filteredData?.map(({ id }) => id) || [],
    [filteredData]
  )

  const table = useTable({
    features,

    data: filteredData,

    columns,

    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },

    getRowId: (row) => row.id.toString(),

    enableRowSelection: true,

    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  })

  function handleDragEnd(event) {
    const { active, over } = event

    if (active && over && active.id !== over.id) {
      setData((currentData) => {
        const oldIndex = currentData.findIndex(
          (item) => item.id.toString() === active.id.toString()
        )

        const newIndex = currentData.findIndex(
          (item) => item.id.toString() === over.id.toString()
        )

        if (oldIndex === -1 || newIndex === -1) {
          return currentData
        }

        return arrayMove(
          currentData,
          oldIndex,
          newIndex
        )
      })
    }
  }

  const categories = [
    ...new Set(data.map((item) => item.category))
  ]

  const statuses = [
    ...new Set(data.map((item) => item.status))
  ]


  function clearFilters() {
    setSearch("")
    setCategoryFilter("all")
    setStatusFilter("all")

    setPagination((current) => ({
      ...current,
      pageIndex: 0,
    }))
  }

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">

        <Label
          htmlFor="view-selector"
          className="sr-only"
        >
          View
        </Label>

        <Select
          defaultValue="outline"
          items={[
            {
              label: "Outline",
              value: "outline",
            },
            {
              label: "Past Performance",
              value: "past-performance",
            },
            {
              label: "Key Personnel",
              value: "key-personnel",
            },
            {
              label: "Focus Documents",
              value: "focus-documents",
            },
          ]}
        >
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="outline">
                Outline
              </SelectItem>

              <SelectItem value="past-performance">
                Past Performance
              </SelectItem>

              <SelectItem value="key-personnel">
                Key Personnel
              </SelectItem>

              <SelectItem value="focus-documents">
                Focus Documents
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="outline">
            Materials Management
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search materials..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="w-full max-w-56"
          />
          <Select
            value={categoryFilter}
            onValueChange={(value) =>
              setCategoryFilter(value)
            }
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  Category
                </SelectLabel>

                <SelectItem value="all">
                  All categories
                </SelectItem>

                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value)
            }
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  Status
                </SelectLabel>

                <SelectItem value="all">
                  All statuses
                </SelectItem>

                {statuses.map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                  >
                    {status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            disabled={
              search === "" &&
              categoryFilter === "all" &&
              statusFilter === "all"
            }
          >
            Clear filters
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                />
              }
            >
              <Columns3Icon data-icon="inline-start" />
              Columns
              <ChevronDownIcon data-icon="inline-end" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-32"
            >
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !==
                      "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(
                          !!value
                        )
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map(
                  (headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(
                        (header) => {
                          return (
                            <TableHead
                              key={header.id}
                              colSpan={header.colSpan}
                            >
                              {header.isPlaceholder
                                ? null
                                : (
                                  <FlexRender
                                    header={header}
                                  />
                                )}
                            </TableHead>
                          )
                        }
                      )}
                    </TableRow>
                  )
                )}
              </TableHeader>

              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={
                      verticalListSortingStrategy
                    }
                  >
                    {table
                      .getRowModel()
                      .rows
                      .map((row) => (
                        <DraggableRow
                          key={row.id}
                          row={row}
                        />
                      ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>

        {/* PAGINAÇÃO */}
        <div className="flex items-center justify-between px-4">

          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length}{" "}
            of{" "}
            {table.getFilteredRowModel().rows.length}{" "}
            row(s) selected.
          </div>

          <div className="flex w-full items-center gap-8 lg:w-fit">

            <div className="hidden items-center gap-2 lg:flex">
              <Label
                htmlFor="rows-per-page"
                className="text-sm font-medium"
              >
                Rows per page
              </Label>

              <Select
                value={`${table.state.pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(
                    Number(value)
                  )
                }}
                items={[10, 20, 30, 40, 50].map(
                  (pageSize) => ({
                    label: `${pageSize}`,
                    value: `${pageSize}`,
                  })
                )}
              >
                <SelectTrigger
                  size="sm"
                  className="w-20"
                  id="rows-per-page"
                >
                  <SelectValue
                    placeholder={
                      table.state.pagination.pageSize
                    }
                  />
                </SelectTrigger>

                <SelectContent side="top">
                  <SelectGroup>
                    {[10, 20, 30, 40, 50].map(
                      (pageSize) => (
                        <SelectItem
                          key={pageSize}
                          value={`${pageSize}`}
                        >
                          {pageSize}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page{" "}
              {table.state.pagination.pageIndex + 1}{" "}
              of{" "}
              {table.getPageCount()}
            </div>

            <div className="ml-auto flex items-center gap-2 lg:ml-0">

              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() =>
                  table.setPageIndex(0)
                }
                disabled={
                  !table.getCanPreviousPage()
                }
              >
                <span className="sr-only">
                  Go to first page
                </span>

                <ChevronsLeftIcon />
              </Button>

              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() =>
                  table.previousPage()
                }
                disabled={
                  !table.getCanPreviousPage()
                }
              >
                <span className="sr-only">
                  Go to previous page
                </span>

                <ChevronLeftIcon />
              </Button>

              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() =>
                  table.nextPage()
                }
                disabled={
                  !table.getCanNextPage()
                }
              >
                <span className="sr-only">
                  Go to next page
                </span>

                <ChevronRightIcon />
              </Button>

              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() =>
                  table.setPageIndex(
                    table.getPageCount() - 1
                  )
                }
                disabled={
                  !table.getCanNextPage()
                }
              >
                <span className="sr-only">
                  Go to last page
                </span>

                <ChevronsRightIcon />
              </Button>

            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="past-performance"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed" />
      </TabsContent>

      <TabsContent
        value="key-personnel"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed" />
      </TabsContent>

      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed" />
      </TabsContent>
    </Tabs>
  )
}