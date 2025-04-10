/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { ArrowUpDown, Edit, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";

// Datos de ejemplo para clientes
export const clientsData = [
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
];

interface ClientsTableProps {
  searchQuery: string;
}

export function ClientsTable({ searchQuery }: ClientsTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filtrar datos basados en la búsqueda
  const filteredData = clientsData.filter((client) =>
    Object.values(client).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Ordenar datos basados en columna y dirección
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Manejar ordenamiento
  /* const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };*/

  const [showForm, setShowForm] = useState(false);
  const [newUnit, setNewUnit] = useState({
    id: "",
    nombre: "",
    tipo: "",
    unidades: "",
    servicios: "",
    type: "Van",
    client: "Unassigned",
    service: "Unassigned",
    driver: "Unassigned",
    finDeContrato: "",
    nombre_expiry: "",
    contrato: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUnit((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar la nueva unidad
    console.log("Nueva unidad a guardar:", newUnit);
    // Reset form
    setNewUnit({
      id: "",
      nombre: "",
      tipo: "",
      unidades: "",
      servicios: "",
      type: "Van",
      client: "Unassigned",
      service: "Unassigned",
      driver: "Unassigned",
      finDeContrato: "",
      nombre_expiry: "",
      contrato: "",
    });
    setShowForm(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Clientes</CardTitle>
        <CardDescription>
          Administre sus clientes, vea asignaciones de servicios y contratos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                // onClick={() => handleSort("id")}
                className="cursor-pointer"
              >
                ID {/*<ArrowUpDown className="ml-2 h-4 w-4 inline" />*/}
              </TableHead>
              <TableHead
                //onClick={() => handleSort("nombre")}
                className="cursor-pointer"
              >
                Nombre {/*<ArrowUpDown className="ml-2 h-4 w-4 inline" />*/}
              </TableHead>
              <TableHead
                // onClick={() => handleSort("tipo")}
                className="cursor-pointer"
              >
                Tipo {/*<ArrowUpDown className="ml-2 h-4 w-4 inline" />*/}
              </TableHead>
              <TableHead
                // onClick={() => handleSort("unidades")}
                className="cursor-pointer"
              >
                Unidades {/*<ArrowUpDown className="ml-2 h-4 w-4 inline" />*/}
              </TableHead>
              <TableHead
                // onClick={() => handleSort("servicios")}
                className="cursor-pointer"
              >
                Servicios {/*<ArrowUpDown className="ml-2 h-4 w-4 inline" />*/}
              </TableHead>
              <TableHead
                //onClick={() => handleSort("contacto")}
                className="cursor-pointer"
              >
                Contacto {/*<ArrowUpDown className="ml-2 h-4 w-4 inline" />*/}
              </TableHead>
              <TableHead
                //onClick={() => handleSort("numeroContrato")}
                className="cursor-pointer"
              >
                Nº Contrato{" "}
                {/*<ArrowUpDown className="ml-2 h-4 w-4 inline" />*/}
              </TableHead>
              <TableHead
                // onClick={() => handleSort("contrato")}
                className="cursor-pointer"
              >
                Fin Contrato{" "}
                {/*<ArrowUpDown className="ml-2 h-4 w-4 inline" />*/}
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

        <div className="mt-6">
          <Button onClick={() => setShowForm(!showForm)} className="mb-4">
            {showForm ? "Cancelar" : "Agregar nuevo cliente"}
          </Button>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 border rounded-md p-4"
            >
              <h3 className="text-lg font-medium">Agregar nuevo cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="id" className="text-sm font-medium">
                    ID
                  </label>
                  <Input
                    id="id"
                    name="id"
                    value={newUnit.id}
                    onChange={handleInputChange}
                    placeholder="VH-XXX"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-sm font-medium">
                    Nombre
                  </label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={newUnit.nombre}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="tipo" className="text-sm font-medium">
                    Tipo
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={newUnit.type}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="Van">Corporativo</option>
                    <option value="Bus">Educación</option>
                    <option value="Minibus">Transporte</option>
                    <option value="Car">Salud</option>
                    <option value="Car">Hoteleria</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="unidades" className="text-sm font-medium">
                    Unidades
                  </label>
                  <Input
                    id="unidades"
                    name="unidades"
                    value={newUnit.unidades}
                    onChange={handleInputChange}
                    placeholder="001"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="servicios" className="text-sm font-medium">
                    Servicios
                  </label>
                  <select
                    id="servicios"
                    name="servicios"
                    value={newUnit.servicios}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="Van">Transporte Ejecutivo</option>
                    <option value="Bus">Rutas Escolares</option>
                    <option value="Minibus">Tours Urbanos</option>
                    <option value="Car">Shuttles Aeropuerto</option>
                    <option value="Car">Transporte Residentes</option>
                    <option value="Car">Traslados Turísticos</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contacto" className="text-sm font-medium">
                    Contacto
                  </label>
                  <Input
                    id="servicios"
                    name="servicios"
                    value={newUnit.servicios}
                    onChange={handleInputChange}
                    placeholder="John Benz"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contrato" className="text-sm font-medium">
                    N° Contrato
                  </label>
                  <Input
                    id="contrato"
                    name="contrato"
                    value={newUnit.contrato}
                    onChange={handleInputChange}
                    placeholder="CONT-2025-002"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="finDeContrato"
                    className="text-sm font-medium"
                  >
                    Fin de contrato
                  </label>
                  <Input
                    id="finDeContrato"
                    name="finDeContrato"
                    type="date"
                    value={newUnit.finDeContrato}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Agregar</Button>
              </div>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
