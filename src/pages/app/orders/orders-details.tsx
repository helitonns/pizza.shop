import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export function OrdersDetails(){
  return(
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: 123567</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="font-medium text-muted-foreground">Pendente</span>
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="text-muted-foreground">Cliente</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                Heliton Nascimento
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="text-muted-foreground">Telefone</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                (95) 99123-7694
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="text-muted-foreground">E-mail</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                email@gmail.com
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="text-muted-foreground">Realizado há</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                15 minutos
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
            <TableRow>
              <TableCell>Pizza Peperone Familia</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">R$ 45,00</TableCell>
              <TableCell className="text-right">R$ 90,00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Coca-cola 2l</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">R$ 14,00</TableCell>
              <TableCell className="text-right">R$ 28,00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell className="font-medium text-right">R$ 118,00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}