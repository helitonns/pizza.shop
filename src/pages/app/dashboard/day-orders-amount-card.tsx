import { getDayOrdersAmount } from "@/api/get-day-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function DayOrdersAmountCard(){
  const { data: dayOrdersAmount, } = useQuery({
    queryFn: getDayOrdersAmount,
    queryKey: ["metrics", "day-orders-amount"]
  });

  return(
    <Card>
      <CardHeader className="flex items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-base font-semibold">
          Pedidos (dia)
        </CardTitle>
        <Utensils className="w-4 h-4 text-muted-foreground"/>
      </CardHeader>

      <CardContent className="space-y-2">
        {dayOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-xs text-muted-foreground">
              {dayOrdersAmount.diffFromYesterday >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">+ {dayOrdersAmount.diffFromYesterday}%</span> em relação ao dia anterior
                </>
              ):  (
                <>
                  <span className="text-rose-500 dark:text-rose-400">{dayOrdersAmount.diffFromYesterday}%</span> em relação ao dia anterior
                </>
              ) }
            </p>
          </>
        ):
        (
          <MetricCardSkeleton />
        )
      }
      </CardContent>
    </Card>
  );
}