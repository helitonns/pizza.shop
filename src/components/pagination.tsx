import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  onPageChange: (pageIndex: number) => Promise<void> | void;
}

export function Pagination({ pageIndex, totalCount, perPage, onPageChange }: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>

        <TooltipProvider>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => onPageChange(0)} disabled={pageIndex === 0} variant="outline" className="w-8 h-8 p-0">
                  <ChevronsLeft className="w-4 h-4" />
                  <span className="sr-only">Primeira página</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Primeira página</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => onPageChange(pageIndex - 1)} disabled={pageIndex === 0} variant="outline" className="w-8 h-8 p-0">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="sr-only">Página anterior</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Página anteior</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => onPageChange(pageIndex + 1)} disabled={pages <= pageIndex + 1} variant="outline" className="w-8 h-8 p-0">
                  <ChevronRight className="w-4 h-4" />
                  <span className="sr-only">Próxima página</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Próxima página</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => onPageChange(pages - 1)} disabled={pages <= pageIndex + 1} variant="outline" className="w-8 h-8 p-0">
                  <ChevronsRight className="w-4 h-4" />
                  <span className="sr-only">Última página</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Última página</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}