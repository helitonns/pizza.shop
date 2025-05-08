import { cancelOrde } from "@/api/cancel-order";
import { GetOrdersResponse } from "@/api/get-orders";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";
import { OrderStatus } from "./order-status";
import { OrdersDetails } from "./orders-details";

//=============================================================================
export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }
}
//=============================================================================
export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpden, setIsDetailsOpden] = useState(false);
  const queryClient = useQueryClient();
  
  //sem utilizar a interface otimista
  const { mutateAsync: calcelOrderFn } = useMutation({
    mutationFn: cancelOrde,
    async onSuccess(_, { orderId }){
      const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ["orders"]
      });

      ordersListCache.forEach(([cacheKey, cacheData])=> {
        if(!cacheData) return;

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map(order => {
            if(order.orderId === orderId){
              return {...order, status: "canceled"}
            }
            return order;
          })
        });
      });
    }
  });

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
        <Button 
          onClick={()=> calcelOrderFn({orderId: order.orderId})}
          disabled={!["pending", "processing"].includes(order.status)} 
          variant="ghost" 
          size="sm"
        >
          <X className="w-3 h-3 mr-2" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}