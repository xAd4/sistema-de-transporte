import { useState } from "react";
import {
  AlertCircle,
  ArrowUpDown,
  CheckCircle2,
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

// Datos de ejemplo para choferes
export const driversData = [
  {
    id: "D-001",
    Nombre: "Juan",
    apellido: "Pérez",
    edad: 35,
    vive: "Ciudad de México",
    habilitado: "2024-08-15",
    cliente: "Corporativo Express",
    servicio: "Transporte Ejecutivo",
    unidad: "VH-001",
    estado: "Activo",
    telefono: "555-123-4567",
  },
  {
    id: "D-002",
    Nombre: "María",
    apellido: "Rodríguez",
    edad: 42,
    vive: "Guadalajara",
    habilitado: "2024-11-30",
    cliente: "Escuela Primaria 5",
    servicio: "Ruta Escolar 7",
    unidad: "VH-002",
    estado: "Activo",
    telefono: "555-234-5678",
  },
  {
    id: "D-003",
    Nombre: "David",
    apellido: "Chen",
    edad: 38,
    vive: "Monterrey",
    habilitado: "2024-05-10",
    cliente: "Turismo Plus",
    servicio: "Tour Urbano A",
    unidad: "VH-004",
    estado: "Alerta",
    telefono: "555-345-6789",
  },
  {
    id: "D-004",
    Nombre: "Sara",
    apellido: "Jiménez",
    edad: 29,
    vive: "Cancún",
    habilitado: "2024-08-10",
    cliente: "Aeropuerto Connect",
    servicio: "Shuttle Aeropuerto",
    unidad: "VH-005",
    estado: "Activo",
    telefono: "555-456-7890",
  },
  {
    id: "D-005",
    Nombre: "Miguel",
    apellido: "Blanco",
    edad: 45,
    vive: "Puebla",
    habilitado: "2024-04-01",
    cliente: "Sin asignar",
    servicio: "Sin asignar",
    unidad: "Sin asignar",
    estado: "Inactivo",
    telefono: "555-567-8901",
  },
  {
    id: "D-006",
    Nombre: "Juana",
    apellido: "López",
    edad: 33,
    vive: "Tijuana",
    habilitado: "2024-03-30",
    cliente: "Sin asignar",
    servicio: "Sin asignar",
    unidad: "Sin asignar",
    estado: "Permiso",
    telefono: "555-678-9012",
  },
];

interface DriversTableProps {
  searchQuery: string;
}

export function DriversTable({ searchQuery }: DriversTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filtrar datos basados en la búsqueda
  const filteredData = driversData.filter((driver) =>
    Object.values(driver).some((value) =>
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

  // Verificar si una fecha está próxima a vencer (menos de 14 días)
  const isExpiringSoon = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 14 && diffDays > 0;
  };

  // Verificar si una fecha ya venció
  const isExpired = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    return date < today;
  };

  const [showForm, setShowForm] = useState(false);
  const [newUnit, setNewUnit] = useState({
    id: "",
    nombre: "",
    apellido: "",
    unidad: "",
    cliente: "",
    habilitacion: "",
    estado: "Active",
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
      apellido: "",
      unidad: "",
      cliente: "",
      habilitacion: "",
      estado: "Active",
    });
    setShowForm(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Choferes</CardTitle>
        <CardDescription>
          Administre sus choferes, vea asignaciones y habilitaciones.
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
                onClick={() => handleSort("Nombre")}
                className="cursor-pointer"
              >
                Nombre <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("apellido")}
                className="cursor-pointer"
              >
                Apellido <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("estado")}
                className="cursor-pointer"
              >
                Estado <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("unidad")}
                className="cursor-pointer"
              >
                Unidad <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("cliente")}
                className="cursor-pointer"
              >
                Cliente <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("habilitado")}
                className="cursor-pointer"
              >
                Habilitación <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell className="font-medium">{driver.id}</TableCell>
                <TableCell>{driver.Nombre}</TableCell>
                <TableCell>{driver.apellido}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      driver.estado === "Activo"
                        ? "default"
                        : driver.estado === "Inactivo"
                        ? "outline"
                        : driver.estado === "Alerta"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {driver.estado === "Activo" ? (
                      <CheckCircle2 className="mr-1 h-3 w-3 inline" />
                    ) : driver.estado === "Alerta" ? (
                      <AlertCircle className="mr-1 h-3 w-3 inline" />
                    ) : (
                      <XCircle className="mr-1 h-3 w-3 inline" />
                    )}
                    {driver.estado}
                  </Badge>
                </TableCell>
                <TableCell>{driver.unidad}</TableCell>
                <TableCell>{driver.cliente}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className={`${
                            isExpired(driver.habilitado)
                              ? "text-red-500 font-medium"
                              : isExpiringSoon(driver.habilitado)
                              ? "text-amber-500 font-medium"
                              : ""
                          }`}
                        >
                          {driver.habilitado}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {isExpired(driver.habilitado)
                          ? "¡Habilitación vencida!"
                          : isExpiringSoon(driver.habilitado)
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
                      <DropdownMenuItem>Asignar Unidad</DropdownMenuItem>
                      <DropdownMenuItem>Cambiar Estado</DropdownMenuItem>
                      <DropdownMenuItem>Ver Horario</DropdownMenuItem>
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
        <div className="mt-6">
          <Button onClick={() => setShowForm(!showForm)} className="mb-4">
            {showForm ? "Cancelar" : "Agregar nuevo chofer"}
          </Button>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 border rounded-md p-4"
            >
              <h3 className="text-lg font-medium">Agregar nuevo chofer</h3>
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
                  <label htmlFor="Nombre" className="text-sm font-medium">
                    Nombre
                  </label>
                  <Input
                    id="Nombre"
                    name="Nombre"
                    value={newUnit.nombre}
                    onChange={handleInputChange}
                    placeholder="ABC123"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="apellido" className="text-sm font-medium">
                    Apellido
                  </label>
                  <Input
                    id="apellido"
                    name="apellido"
                    value={newUnit.apellido}
                    onChange={handleInputChange}
                    placeholder="Mercedes Sprinter"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="unidad" className="text-sm font-medium">
                    Unidad
                  </label>
                  <Input
                    id="unidad"
                    name="unidad"
                    value={newUnit.unidad}
                    onChange={handleInputChange}
                    placeholder="001"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cliente" className="text-sm font-medium">
                    Cliente
                  </label>
                  <Input
                    id="cliente"
                    name="cliente"
                    value={newUnit.cliente}
                    onChange={handleInputChange}
                    placeholder="Mercedes-Benz"
                    required
                  />
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
                    <option value="Active">Active</option>
                    <option value="habilitacion">habilitacion</option>
                    <option value="Alert">Alert</option>
                    <option value="Out of Service">Out of Service</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="habilitacion" className="text-sm font-medium">
                    Habitación
                  </label>
                  <Input
                    id="habilitacion"
                    name="habilitacion"
                    type="date"
                    value={newUnit.habilitacion}
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
