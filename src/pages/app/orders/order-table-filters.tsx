import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

export function OrderTabelFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros</span>
      <Input placeholder="ID do pedido" className="w-auto h-8" />
      <Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
      
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent >
          <SelectItem value="all">Todos status</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
          <SelectItem value="processing">Em preparo</SelectItem>
          <SelectItem value="delevering">Em entrega</SelectItem>
          <SelectItem value="delevered">Entregue</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="secondary" type="submit">
        <Search className="w-4 h-4 mr-2" />
        Filtrar resultados
      </Button>

      <Button variant="outline"  type="button">
        <X className="w-4 h-4 mr-2" />
        Remover resultados
      </Button>
    </form>
  );
}