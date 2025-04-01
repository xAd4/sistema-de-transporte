"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Edit,
  MoreHorizontal,
  XCircle,
} from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "./ui/input";
import { clientsData } from "./ClientsTable";
import { fleetData } from "./FleetTable";
import { driversData } from "./DriversTable";

// Datos de ejemplo para servicios
const servicesData = [
  {
    id: "S-001",
    nombre: "Ruta Regular 42",
    cliente: "Corporativo Express",
    unidad: "VH-001",
    chofer: "Juan Pérez",
    horario: "Diario",
    estado: "Activo",
    vencimiento: "2024-12-31",
    mantenimiento: "2024-05-15",
  },
  {
    id: "S-002",
    nombre: "Ruta Escolar 7",
    cliente: "Escuela Primaria 5",
    unidad: "VH-002",
    chofer: "María Rodríguez",
    horario: "Lunes a Viernes",
    estado: "Activo",
    vencimiento: "2025-06-30",
    mantenimiento: "2024-04-10",
  },
  {
    id: "S-003",
    nombre: "Shuttle Corporativo A",
    cliente: "Corporativo Express",
    unidad: "Sin asignar",
    chofer: "Sin asignar",
    horario: "Lunes a Viernes",
    estado: "Suspendido",
    vencimiento: "2024-09-15",
    mantenimiento: "N/A",
  },
  {
    id: "S-004",
    nombre: "Tour Urbano A",
    cliente: "Turismo Plus",
    unidad: "VH-004",
    chofer: "David Chen",
    horario: "Fines de semana",
    estado: "Activo",
    vencimiento: "2026-03-01",
    mantenimiento: "2024-06-20",
  },
  {
    id: "S-005",
    nombre: "Shuttle Aeropuerto",
    cliente: "Aeropuerto Connect",
    unidad: "VH-005",
    chofer: "Sara Jiménez",
    horario: "Diario",
    estado: "Activo",
    vencimiento: "2025-08-15",
    mantenimiento: "2024-04-25",
  },
  {
    id: "S-006",
    nombre: "Transporte Senior",
    cliente: "Residencias Senior",
    unidad: "Sin asignar",
    chofer: "Miguel Blanco",
    horario: "Bajo demanda",
    estado: "Pendiente",
    vencimiento: "2024-11-30",
    mantenimiento: "N/A",
  },
];

interface ServicesTableProps {
  searchQuery: string;
}

export function ServicesTable({ searchQuery }: ServicesTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filtrar datos basados en la búsqueda
  const filteredData = servicesData.filter((service) =>
    Object.values(service).some((value) =>
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
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Verificar si una fecha está próxima a vencer (menos de 30 días)
  const isExpiringSoon = (dateStr: string) => {
    if (dateStr === "N/A") return false;
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  // Verificar si una fecha ya venció
  const isExpired = (dateStr: string) => {
    if (dateStr === "N/A") return false;
    const date = new Date(dateStr);
    const today = new Date();
    return date < today;
  };

  const [showForm, setShowForm] = useState(false);
  const [newUnit, setNewUnit] = useState({
    id: "",
    servicio: "",
    cliente: "",
    unidad: "",
    chofer: "",
    estado: "Van",
    vencimiento: "Unassigned",
    mantenimiento: "Unassigned",
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
      servicio: "",
      cliente: "",
      unidad: "",
      chofer: "",
      estado: "Van",
      vencimiento: "Unassigned",
      mantenimiento: "Unassigned",
    });
    setShowForm(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Servicios</CardTitle>
        <CardDescription>
          Administre sus servicios de transporte, horarios y asignaciones.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => handleSort("id")}
                className="cursor-pointer"
              >
                ID <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("nombre")}
                className="cursor-pointer"
              >
                Servicio <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("cliente")}
                className="cursor-pointer"
              >
                Cliente <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("unidad")}
                className="cursor-pointer"
              >
                Unidad <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("chofer")}
                className="cursor-pointer"
              >
                Chofer <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("estado")}
                className="cursor-pointer"
              >
                Estado <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("vencimiento")}
                className="cursor-pointer"
              >
                Vencimiento <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("mantenimiento")}
                className="cursor-pointer"
              >
                Mantenimiento <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.id}</TableCell>
                <TableCell>{service.nombre}</TableCell>
                <TableCell>{service.cliente}</TableCell>
                <TableCell>{service.unidad}</TableCell>
                <TableCell>{service.chofer}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      service.estado === "Activo"
                        ? "default"
                        : service.estado === "Pendiente"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {service.estado === "Activo" ? (
                      <CheckCircle2 className="mr-1 h-3 w-3 inline" />
                    ) : service.estado === "Pendiente" ? (
                      <Clock className="mr-1 h-3 w-3 inline" />
                    ) : (
                      <XCircle className="mr-1 h-3 w-3 inline" />
                    )}
                    {service.estado}
                  </Badge>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className={`${
                            isExpired(service.vencimiento)
                              ? "text-red-500 font-medium"
                              : isExpiringSoon(service.vencimiento)
                              ? "text-amber-500 font-medium"
                              : ""
                          }`}
                        >
                          {service.vencimiento}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {isExpired(service.vencimiento)
                          ? "¡Servicio vencido!"
                          : isExpiringSoon(service.vencimiento)
                          ? "Servicio próximo a vencer"
                          : "Servicio vigente"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className={`${
                            isExpired(service.mantenimiento)
                              ? "text-red-500 font-medium"
                              : isExpiringSoon(service.mantenimiento)
                              ? "text-amber-500 font-medium"
                              : ""
                          }`}
                        >
                          {service.mantenimiento}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {isExpired(service.mantenimiento)
                          ? "¡Mantenimiento vencido!"
                          : isExpiringSoon(service.mantenimiento)
                          ? "Mantenimiento próximo"
                          : "Mantenimiento al día"}
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
                      <DropdownMenuItem>Asignar Unidad</DropdownMenuItem>
                      <DropdownMenuItem>Asignar Chofer</DropdownMenuItem>
                      <DropdownMenuItem>Actualizar Horario</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Renovar Servicio</DropdownMenuItem>
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
            {showForm ? "Cancelar" : "Agregar nuevo servicio"}
          </Button>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 border rounded-md p-4"
            >
              <h3 className="text-lg font-medium">Agregar nuevo servicio</h3>
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
                  <label htmlFor="servicio" className="text-sm font-medium">
                    Servicio
                  </label>
                  <Input
                    id="servicio"
                    name="servicio"
                    value={newUnit.servicio}
                    onChange={handleInputChange}
                    placeholder="Servicio"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cliente" className="text-sm font-medium">
                    Cliente
                  </label>
                  <select
                    id="cliente"
                    name="cliente"
                    value={newUnit.cliente}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    {clientsData.map((client) => (
                      <option key={client.id} value="Van">
                        {client.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="unidad" className="text-sm font-medium">
                    Unidad
                  </label>
                  <select
                    id="cliente"
                    name="cliente"
                    value={newUnit.cliente}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    {fleetData.map((fleet) => (
                      <option key={fleet.id} value="Van">
                        {fleet.id} - {fleet.modelo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="chofer" className="text-sm font-medium">
                    Chofer
                  </label>
                  <select
                    id="chofer"
                    name="chofer"
                    value={newUnit.chofer}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    {driversData.map((driver) => (
                      <option key={driver.id} value="Van">
                        {driver.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="estado" className="text-sm font-medium">
                    Estado
                  </label>
                  <select
                    id="estado"
                    name="estado"
                    value={newUnit.estado}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="Van">Activo</option>
                    <option value="Bus">Suspendido</option>
                    <option value="Minibus">Pendiente</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="vencimiento" className="text-sm font-medium">
                    Vencimiento
                  </label>
                  <Input
                    id="vencimiento"
                    name="vencimiento"
                    type="date"
                    value={newUnit.vencimiento}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="finDeContrato"
                    className="text-sm font-medium"
                  >
                    Mantenimiento
                  </label>
                  <Input
                    id="mantenimiento"
                    name="mantenimiento"
                    type="date"
                    value={newUnit.mantenimiento}
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
