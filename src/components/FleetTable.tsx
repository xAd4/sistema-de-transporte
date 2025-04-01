"use client"

import { useState } from "react"
import { AlertCircle, ArrowUpDown, CheckCircle2, Edit, MoreHorizontal, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Datos de ejemplo para unidades
const fleetData = [
  {
    id: "VH-001",
    patente: "ABC123",
    modelo: "Mercedes Sprinter",
    numero: "001",
    marca: "Mercedes-Benz",
    tipo: "Van",
    cliente: "Corporativo Express",
    servicio: "Transporte Ejecutivo",
    chofer: "Juan Pérez",
    mantenimiento: "2024-05-15",
    habilitacion: "2024-06-30",
    estado: "Activo",
  },
  {
    id: "VH-002",
    patente: "XYZ789",
    modelo: "Volvo 9800",
    numero: "002",
    marca: "Volvo",
    tipo: "Bus",
    cliente: "Escuela Primaria 5",
    servicio: "Ruta Escolar 7",
    chofer: "María Rodríguez",
    mantenimiento: "2024-04-10",
    habilitacion: "2024-07-15",
    estado: "Activo",
  },
  {
    id: "VH-003",
    patente: "DEF456",
    modelo: "Toyota Hiace",
    numero: "003",
    marca: "Toyota",
    tipo: "Van",
    cliente: "Sin asignar",
    servicio: "Sin asignar",
    chofer: "Sin asignar",
    mantenimiento: "2024-03-05",
    habilitacion: "2024-04-01",
    estado: "Mantenimiento",
  },
  {
    id: "VH-004",
    patente: "GHI789",
    modelo: "Scania K410",
    numero: "004",
    marca: "Scania",
    tipo: "Bus",
    cliente: "Turismo Plus",
    servicio: "Tour Urbano A",
    chofer: "David Chen",
    mantenimiento: "2024-06-20",
    habilitacion: "2024-05-10",
    estado: "Alerta",
  },
  {
    id: "VH-005",
    patente: "JKL012",
    modelo: "Ford Transit",
    numero: "005",
    marca: "Ford",
    tipo: "Van",
    cliente: "Aeropuerto Connect",
    servicio: "Shuttle Aeropuerto",
    chofer: "Sara Jiménez",
    mantenimiento: "2024-04-25",
    habilitacion: "2024-08-15",
    estado: "Activo",
  },
  {
    id: "VH-006",
    patente: "MNO345",
    modelo: "Mercedes O500",
    numero: "006",
    marca: "Mercedes-Benz",
    tipo: "Bus",
    cliente: "Sin asignar",
    servicio: "Sin asignar",
    chofer: "Sin asignar",
    mantenimiento: "2023-11-30",
    habilitacion: "2024-03-30",
    estado: "Fuera de Servicio",
  },
]

interface FleetTableProps {
  searchQuery: string
}

export function FleetTable({ searchQuery }: FleetTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Filtrar datos basados en la búsqueda
  const filteredData = fleetData.filter((unit) =>
    Object.values(unit).some((value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Ordenar datos basados en columna y dirección
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Manejar ordenamiento
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Verificar si una fecha está próxima a vencer (menos de 30 días)
  const isExpiringSoon = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
  }

  // Verificar si una fecha ya venció
  const isExpired = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    return date < today
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventario de Unidades</CardTitle>
        <CardDescription>Administre sus unidades de transporte, vea el estado y asignaciones.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("id")} className="cursor-pointer">
                ID <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("patente")} className="cursor-pointer">
                Patente <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("modelo")} className="cursor-pointer">
                Modelo <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("tipo")} className="cursor-pointer">
                Tipo <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("estado")} className="cursor-pointer">
                Estado <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("cliente")} className="cursor-pointer">
                Cliente <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("chofer")} className="cursor-pointer">
                Chofer <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("habilitacion")} className="cursor-pointer">
                Habilitación <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell className="font-medium">{unit.id}</TableCell>
                <TableCell>{unit.patente}</TableCell>
                <TableCell>{unit.modelo}</TableCell>
                <TableCell>{unit.tipo}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      unit.estado === "Activo"
                        ? "default"
                        : unit.estado === "Mantenimiento"
                          ? "outline"
                          : unit.estado === "Alerta"
                            ? "secondary"
                            : "destructive"
                    }
                  >
                    {unit.estado === "Activo" ? (
                      <CheckCircle2 className="mr-1 h-3 w-3 inline" />
                    ) : unit.estado === "Alerta" ? (
                      <AlertCircle className="mr-1 h-3 w-3 inline" />
                    ) : (
                      <XCircle className="mr-1 h-3 w-3 inline" />
                    )}
                    {unit.estado}
                  </Badge>
                </TableCell>
                <TableCell>{unit.cliente}</TableCell>
                <TableCell>{unit.chofer}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className={`${
                            isExpired(unit.habilitacion)
                              ? "text-red-500 font-medium"
                              : isExpiringSoon(unit.habilitacion)
                                ? "text-amber-500 font-medium"
                                : ""
                          }`}
                        >
                          {unit.habilitacion}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {isExpired(unit.habilitacion)
                          ? "¡Habilitación vencida!"
                          : isExpiringSoon(unit.habilitacion)
                            ? "Habilitación próxima a vencer"
                            : "Habilitación vigente"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Detalles
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Asignar Chofer</DropdownMenuItem>
                      <DropdownMenuItem>Asignar Cliente</DropdownMenuItem>
                      <DropdownMenuItem>Programar Mantenimiento</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Renovar Habilitación</DropdownMenuItem>
                      <DropdownMenuItem>Ver Historial</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

