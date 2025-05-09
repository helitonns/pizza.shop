import { getMonthOrdersAmount } from "@/api/get-month-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

export function MonthOrdersAmountCard(){
  const { data: monthOrdersAmount } = useQuery({
    queryFn: getMonthOrdersAmount,
    queryKey: ["metrics", "month-orders-amount"]
  });

  return(
    <Card>
      <CardHeader className="flex items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-base font-semibold">
          Pedidos (mês)
        </CardTitle>
        <Utensils className="w-4 h-4 text-muted-foreground"/>
      </CardHeader>

      <CardContent className="space-y-2">
      {monthOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">+ {monthOrdersAmount.diffFromLastMonth}%</span> em relação ao mês anterior
                </>
              ):  (
                <>
                  <span className="text-rose-500 dark:text-rose-400">{monthOrdersAmount.diffFromLastMonth}%</span> em relação ao mês anterior
                </>
              ) }
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}