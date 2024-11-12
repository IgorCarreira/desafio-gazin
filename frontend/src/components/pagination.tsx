import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/button";

export interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  lastPage: number;
  setPage: (page: number) => void;
}

export const Pagination = ({
  pageIndex,
  setPage,
  perPage,
  totalCount,
  lastPage,
}: PaginationProps) => {
  const handleClickFirstPage = () => {
    setPage(1);
  };
  const handleClickPreviousPage = () => {
    setPage(pageIndex - 1);
  };
  const handleClickNextPage = () => {
    setPage(pageIndex + 1);
  };
  const handleClickLastPage = () => {
    setPage(lastPage);
  };
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Exibindo {totalCount < perPage ? totalCount : perPage} de {totalCount}{" "}
        item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="flex text-sm font-medium">
          Página {pageIndex} de {lastPage}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={handleClickFirstPage}
            disabled={pageIndex <= 1}
          >
            <ChevronsLeft className="size-4" />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={handleClickPreviousPage}
            disabled={pageIndex <= 1}
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={handleClickNextPage}
            disabled={pageIndex >= lastPage}
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={handleClickLastPage}
            disabled={pageIndex >= lastPage}
          >
            <ChevronsRight className="size-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
