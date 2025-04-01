"use client"

import { useState } from "react"
import { ArrowUpDown, Edit, MoreHorizontal } from "lucide-react"

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

// Datos de ejemplo para clientes
const clientsData = [
  {
    id: "C-001",
    nombre: "Corporativo Express",
    tipo: "Corporativo",
    unidades: 3,
    servicios: "Transporte Ejecutivo",
    contacto: "Miguel Ejecutivo",
    telefono: "555-111-2222",
    contrato: "2025-12-31",
    numeroContrato: "CONT-2023-001",
  },
  {
    id: "C-002",
    nombre: "Escuela Primaria 5",
    tipo: "Educación",
    unidades: 8,
    servicios: "Rutas Escolares",
    contacto: "Emily Directora",
    telefono: "555-222-3333",
    contrato: "2025-06-30",
    numeroContrato: "CONT-2023-002",
  },
  {
    id: "C-003",
    nombre: "Turismo Plus",
    tipo: "Turismo",
    unidades: 4,
    servicios: "Tours Urbanos",
    contacto: "Lisa Directora",
    telefono: "555-444-5555",
    contrato: "2026-03-01",
    numeroContrato: "CONT-2023-003",
  },
  {
    id: "C-004",
    nombre: "Aeropuerto Connect",
    tipo: "Transporte",
    unidades: 6,
    servicios: "Shuttles Aeropuerto",
    contacto: "Roberto Gerente",
    telefono: "555-555-6666",
    contrato: "2025-08-15",
    numeroContrato: "CONT-2023-004",
  },
  {
    id: "C-005",
    nombre: "Residencias Senior",
    tipo: "Salud",
    unidades: 2,
    servicios: "Transporte Residentes",
    contacto: "Patricia Coordinadora",
    telefono: "555-666-7777",
    contrato: "2024-11-30",
    numeroContrato: "CONT-2023-005",
  },
  {
    id: "C-006",
    nombre: "Hotel Playa Azul",
    tipo: "Hotelería",
    unidades: 3,
    servicios: "Traslados Turísticos",
    contacto: "Carlos Gerente",
    telefono: "555-777-8888",
    contrato: "2025-04-15",
    numeroContrato: "CONT-2023-006",
  },
]

interface ClientsTableProps {
  searchQuery: string
}

export function ClientsTable({ searchQuery }: ClientsTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Filtrar datos basados en la búsqueda
  const filteredData = clientsData.filter((client) =>
    Object.values(client).some((value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase())),
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Clientes</CardTitle>
        <CardDescription>Administre sus clientes, vea asignaciones de servicios y contratos.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("id")} className="cursor-pointer">
                ID <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("nombre")} className="cursor-pointer">
                Nombre <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("tipo")} className="cursor-pointer">
                Tipo <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("unidades")} className="cursor-pointer">
                Unidades <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("servicios")} className="cursor-pointer">
                Servicios <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("contacto")} className="cursor-pointer">
                Contacto <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("numeroContrato")} className="cursor-pointer">
                Nº Contrato <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort("contrato")} className="cursor-pointer">
                Fin Contrato <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.id}</TableCell>
                <TableCell>{client.nombre}</TableCell>
                <TableCell>{client.tipo}</TableCell>
                <TableCell>{client.unidades}</TableCell>
                <TableCell>{client.servicios}</TableCell>
                <TableCell>{client.contacto}</TableCell>
                <TableCell>{client.numeroContrato}</TableCell>
                <TableCell>{client.contrato}</TableCell>
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
                      <DropdownMenuItem>Asignar Unidades</DropdownMenuItem>
                      <DropdownMenuItem>Gestionar Servicios</DropdownMenuItem>
                      <DropdownMenuItem>Renovar Contrato</DropdownMenuItem>
                      <DropdownMenuSeparator />
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

