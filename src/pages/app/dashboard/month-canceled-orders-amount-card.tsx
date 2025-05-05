import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

export function MonthCanceledOrdersAmountCard(){
  return(
    <Card>
      <CardHeader className="flex items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-base font-semibold">
          Cacelamentos (mês)
        </CardTitle>
        <X className="w-4 h-4 text-muted-foreground"/>
      </CardHeader>

      <CardContent className="space-y-2">
        <span className="text-2xl font-bold tracking-tight">
          32
        </span>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">
            -2% em relação ao mês passado
          </span>
        </p>
      </CardContent>
    </Card>
  );
}