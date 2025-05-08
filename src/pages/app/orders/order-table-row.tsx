import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";
import { OrderStatus } from "./order-status";
import { OrdersDetails } from "./orders-details";

export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpden, setIsDetailsOpden] = useState(false);

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpden} onOpenChange={setIsDetailsOpden}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Search className="w-3 h-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrdersDetails open={isDetailsOpden} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">
        {order.customerName}
      </TableCell>
      <TableCell className="font-medium">
        {(order.total/100).toLocaleString("pt-BR", { 
          style:"currency",
          currency: "BRL" 
        })}
      </TableCell>
      <TableCell>
        <Button variant="outline" size="sm">
          <ArrowRight className="w-3 h-3 mr-2" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="sm">
          <X className="w-3 h-3 mr-2" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}