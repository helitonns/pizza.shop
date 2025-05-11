import { approvelOrder } from "@/api/approve-order";
import { cancelOrder } from "@/api/cancel-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchlOrder } from "@/api/dispatch-order";
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
  
  function updateOrderStatusCache(orderId: string, status: OrderStatus){
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ["orders"]
      });

      ordersListCache.forEach(([cacheKey, cacheData])=> {
        if(!cacheData) return;

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map(order => {
            if(order.orderId === orderId){
              return {...order, status}
            }
            return order;
          })
        });
      });
  }

  //sem utilizar a interface otimista
  const { mutateAsync: calcelOrderFn, isPending: isCancelingOrder } = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, { orderId }){
      updateOrderStatusCache(orderId, "canceled");
    }
  });
  
  //sem utilizar a interface otimista
  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
    mutationFn: approvelOrder,
    async onSuccess(_, { orderId }){
      updateOrderStatusCache(orderId, "processing");
    }
  });

  //sem utilizar a interface otimista
  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } = useMutation({
    mutationFn: dispatchlOrder,
    async onSuccess(_, { orderId }){
      updateOrderStatusCache(orderId, "delivering");
    }
  });
  
  //sem utilizar a interface otimista
  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
    mutationFn: deliverOrder,
    async onSuccess(_, { orderId }){
      updateOrderStatusCache(orderId, "delivered");
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
        {order.status === "pending" && (
          <Button 
            onClick={()=> approveOrderFn({orderId: order.orderId})}
            disabled={isApprovingOrder}
            variant="outline" 
            size="sm"
          >
            <ArrowRight className="w-3 h-3 mr-2" />
            Aprovar
          </Button>
        )}
        
        {order.status === "processing" && (
          <Button 
            onClick={()=> dispatchOrderFn({orderId: order.orderId})}
            disabled={isDispatchingOrder}
            variant="outline" 
            size="sm"
          >
            <ArrowRight className="w-3 h-3 mr-2" />
            Em entrega
          </Button>
        )}
        
        {order.status === "delivering" && (
          <Button 
            onClick={()=> deliverOrderFn({orderId: order.orderId})}
            disabled={isDeliveringOrder}
            variant="outline" 
            size="sm"
          >
            <ArrowRight className="w-3 h-3 mr-2" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button 
          onClick={()=> calcelOrderFn({orderId: order.orderId})}
          disabled={!["pending", "processing"].includes(order.status) || isCancelingOrder} 
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