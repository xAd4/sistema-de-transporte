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
import { Input } from "./ui/input";
import { clientsData } from "./ClientsTable";
import { fleetData } from "./FleetTable";

// Datos de ejemplo para pedidos
const ordersData = [
  {
    id: "P-001",
    tipo: "Operativo",
    cliente: "Corporativo Express",
    unidad: "VH-001",
    destino: "Centro Empresarial",
    estado: "Aprobado",
    fechaCreacion: "2024-03-25",
    fechaServicio: "2024-04-01",
    costo: "$1,200.00",
    aprobador: "Juan Gerente",
  },
  {
    id: "P-002",
    tipo: "Operativo",
    cliente: "Escuela Primaria 5",
    unidad: "VH-002",
    destino: "Excursión Museo",
    estado: "Pendiente",
    fechaCreacion: "2024-03-26",
    fechaServicio: "2024-04-05",
    costo: "$950.00",
    aprobador: "Pendiente",
  },
  {
    id: "P-003",
    tipo: "General",
    cliente: "Interno",
    unidad: "N/A",
    destino: "Librería",
    estado: "Aprobado",
    fechaCreacion: "2024-03-24",
    fechaServicio: "2024-03-30",
    costo: "$150.00",
    aprobador: "María Administración",
  },
  {
    id: "P-004",
    tipo: "Operativo",
    cliente: "Turismo Plus",
    unidad: "VH-004",
    destino: "Tour Zona Histórica",
    estado: "Aprobado",
    fechaCreacion: "2024-03-20",
    fechaServicio: "2024-03-28",
    costo: "$1,500.00",
    aprobador: "Carlos Supervisor",
  },
  {
    id: "P-005",
    tipo: "General",
    cliente: "Interno",
    unidad: "N/A",
    destino: "Limpieza Oficinas",
    estado: "Rechazado",
    fechaCreacion: "2024-03-22",
    fechaServicio: "2024-03-29",
    costo: "$300.00",
    aprobador: "María Administración",
  },
  {
    id: "P-006",
    tipo: "Operativo",
    cliente: "Aeropuerto Connect",
    unidad: "VH-005",
    destino: "Terminal Internacional",
    estado: "Pendiente",
    fechaCreacion: "2024-03-27",
    fechaServicio: "2024-04-02",
    costo: "$850.00",
    aprobador: "Pendiente",
  },
];

interface OrdersTableProps {
  searchQuery: string;
}

export function OrdersTable({ searchQuery }: OrdersTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filtrar datos basados en la búsqueda
  const filteredData = ordersData.filter((order) =>
    Object.values(order).some((value) =>
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

  const [showForm, setShowForm] = useState(false);
  const [newUnit, setNewUnit] = useState({
    id: "",
    tipo: "",
    cliente: "",
    unidad: "",
    destino: "",
    estado: "",
    fecha: "",
    costo: "",
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
      tipo: "",
      cliente: "",
      unidad: "",
      destino: "",
      estado: "",
      fecha: "",
      costo: "",
    });
    setShowForm(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Pedidos</CardTitle>
        <CardDescription>
          Administre pedidos operativos y generales, aprobaciones y
          asignaciones.
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
                onClick={() => handleSort("tipo")}
                className="cursor-pointer"
              >
                Tipo <ArrowUpDown className="ml-2 h-4 w-4 inline" />
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
                onClick={() => handleSort("destino")}
                className="cursor-pointer"
              >
                Destino <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("estado")}
                className="cursor-pointer"
              >
                Estado <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("fechaServicio")}
                className="cursor-pointer"
              >
                Fecha <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("costo")}
                className="cursor-pointer"
              >
                Costo <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.tipo}</TableCell>
                <TableCell>{order.cliente}</TableCell>
                <TableCell>{order.unidad}</TableCell>
                <TableCell>{order.destino}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.estado === "Aprobado"
                        ? "default"
                        : order.estado === "Pendiente"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {order.estado === "Aprobado" ? (
                      <CheckCircle2 className="mr-1 h-3 w-3 inline" />
                    ) : order.estado === "Pendiente" ? (
                      <Clock className="mr-1 h-3 w-3 inline" />
                    ) : (
                      <XCircle className="mr-1 h-3 w-3 inline" />
                    )}
                    {order.estado}
                  </Badge>
                </TableCell>
                <TableCell>{order.fechaServicio}</TableCell>
                <TableCell>{order.costo}</TableCell>
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
                      {order.estado === "Pendiente" && (
                        <>
                          <DropdownMenuItem>Aprobar Pedido</DropdownMenuItem>
                          <DropdownMenuItem>Rechazar Pedido</DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      {order.tipo === "Operativo" && (
                        <DropdownMenuItem>Asignar Unidad</DropdownMenuItem>
                      )}
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
            {showForm ? "Cancelar" : "Agregar nuevo pedido"}
          </Button>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 border rounded-md p-4"
            >
              <h3 className="text-lg font-medium">Agregar nuevo pedido</h3>
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
                    placeholder="P-007"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="tipo" className="text-sm font-medium">
                    Tipo
                  </label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={newUnit.tipo}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="Van">Operativo</option>
                    <option value="Bus">General</option>
                  </select>
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
                    id="unidad"
                    name="unidad"
                    value={newUnit.unidad}
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
                  <label htmlFor="destino" className="text-sm font-medium">
                    Destino
                  </label>
                  <select
                    id="destino"
                    name="destino"
                    value={newUnit.destino}
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
                    <option value="Van">Aprobado</option>
                    <option value="Bus">Pendiente</option>
                    <option value="Minibus">Rechazado</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="fecha" className="text-sm font-medium">
                    Fecha
                  </label>
                  <Input
                    id="fecha"
                    name="fecha"
                    type="date"
                    value={newUnit.fecha}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="costo" className="text-sm font-medium">
                    Costo
                  </label>
                  <Input
                    id="costo"
                    name="costo"
                    value={newUnit.costo}
                    onChange={handleInputChange}
                    placeholder="$1,000.00"
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
