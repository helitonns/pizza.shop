import { getOrderDetails, GetOrderDetailsResponse } from "@/api/get-order-details";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { OrderStatus } from "./order-status";
import { OrdersDetailsSkeleton } from "./orders-datails-skeleton";

//=======================================================================
export interface OrderDetailsProps {
  orderId: string;
  open: boolean;
}
//=======================================================================

export function OrdersDetails({orderId, open}: OrderDetailsProps){
  const { data: order,} = useQuery<GetOrderDetailsResponse>({
    queryKey: ["order", orderId],
    queryFn: ()=> getOrderDetails({orderId}),
    enabled: open,

  });

  return(
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      {order ? ( 
      <div className="space-y-6">
        <Table>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="flex justify-end">
              <OrderStatus status={order.status}/>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="text-muted-foreground">Cliente</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                {order.customer.name}
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="text-muted-foreground">Telefone</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                {order.customer.phone ?? "Não informado"}
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="text-muted-foreground">E-mail</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                {order.customer.email}
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="text-muted-foreground">Realizado há</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                {formatDistanceToNow(order.createdAt, {
                  locale: ptBR,
                  addSuffix: true
                })}
              </div>
            </TableCell>
          </TableRow>
        </Table>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {order.orderItems.map(item => {
              return(
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{(item.priceInCents/100).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</TableCell>
                  <TableCell className="text-right">{((item.priceInCents/100) * item.quantity).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell className="font-medium text-right">{(order.totalInCents/100).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      ) : (
        <OrdersDetailsSkeleton /> 
      ) 
    } 
    </DialogContent>
  );
}