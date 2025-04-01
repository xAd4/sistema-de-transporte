import { useState } from "react";
import {
  Bus,
  Calendar,
  //ChevronDown,
  //Filter,
  //Plus,
  //RefreshCw,
  Search,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FleetTable } from "@/components/FleetTable";
import { DriversTable } from "@/components/DriversTable";
import { ClientsTable } from "@/components/ClientsTable";
import { OrdersTable } from "@/components/OrdersTable";
import { ServicesTable } from "@/components/ServicesTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  // Datos de resumen para el panel
  const stats = {
    totalUnits: 48,
    unitsInService: 42,
    totalDrivers: 53,
    activeClients: 12,
    pendingOrders: 5,
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Bus className="h-6 w-6" />
          <h1 className="text-lg font-semibold md:text-xl">
            Sistema de Transporte
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {/*<Button variant="outline" size="sm" className="h-8 gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Actualizar
            </span>
          </Button>*/}
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 px-0 lg:hidden"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Buscar</span>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Unidades
              </CardTitle>
              <Bus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUnits}</div>
              <p className="text-xs text-muted-foreground">
                {stats.unitsInService} actualmente en servicio
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Choferes
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDrivers}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round(stats.totalDrivers * 0.85)} actualmente en servicio
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Clientes Activos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeClients}</div>
              <p className="text-xs text-muted-foreground">
                Con {stats.activeClients * 2} servicios activos
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pedidos Pendientes
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">
                Esperando aprobación
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/*<Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filtrar
                </span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>*/}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Estado</DropdownMenuItem>
              <DropdownMenuItem>Cliente</DropdownMenuItem>
              <DropdownMenuItem>Chofer</DropdownMenuItem>
              <DropdownMenuItem>Tipo de Servicio</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <Button size="sm" className="h-8 gap-1">
            <Plus className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar
            </span>
          </Button>*/}
        </div>
        <Tabs defaultValue="unidades">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="unidades">Unidades</TabsTrigger>
              <TabsTrigger value="choferes">Choferes</TabsTrigger>
              <TabsTrigger value="clientes">Clientes</TabsTrigger>
              <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
              <TabsTrigger value="servicios">Servicios</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="unidades" className="border-none p-0">
            <FleetTable searchQuery={searchQuery} />
          </TabsContent>
          <TabsContent value="choferes" className="border-none p-0">
            <DriversTable searchQuery={searchQuery} />
          </TabsContent>
          <TabsContent value="clientes" className="border-none p-0">
            <ClientsTable searchQuery={searchQuery} />
          </TabsContent>
          <TabsContent value="pedidos" className="border-none p-0">
            <OrdersTable searchQuery={searchQuery} />
          </TabsContent>
          <TabsContent value="servicios" className="border-none p-0">
            <ServicesTable searchQuery={searchQuery} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
