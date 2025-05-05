import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function DayOrdersAmountCard(){
  return(
    <Card>
      <CardHeader className="flex items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-base font-semibold">
          Pedidos (dia)
        </CardTitle>
        <Utensils className="w-4 h-4 text-muted-foreground"/>
      </CardHeader>

      <CardContent className="space-y-2">
        <span className="text-2xl font-bold tracking-tight">
          23
        </span>
        <p className="text-xs text-muted-foreground">
          <span className="text-rose-500 dark:text-rose-400">
            -4% em relação ao dia anterior
          </span>
        </p>
      </CardContent>
    </Card>
  );
}