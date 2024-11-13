import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetchData from "@/hooks/useFetchData";
import { useFilter } from "@/hooks/useFilter";
import { Level, LevelFilterRequest } from "@/types/level";
import { ArrowDown, ArrowUp, ArrowUpDown, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { LevelCreateDialog } from "./level-create-dialog";
import { LevelFilters } from "./level-filters";
import { LevelTableRow } from "./level-table-row";

export const Levels = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const { page, query, updatePage, updateQuery, order, updateOrder } =
    useFilter<LevelFilterRequest>();

  const {
    data: levels,
    lastPage,
    perPage,
    total,
    mutate,
    isLoading,
  } = useFetchData<Level>(
    `${import.meta.env.VITE_API_BASE_URL}/api/niveis`,
    page,
    query
  );

  const onUpdate = () => {
    mutate();
  };

  const onSearch = (newSearchParams: LevelFilterRequest) => {
    updateQuery(newSearchParams);
    mutate();
  };

  const handleOpenDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleClickOrder = (name: string) => {
    updateOrder(name);
  };

  const getArrowIcon = (field: string) => {
    if (order.field !== field) return <ArrowUpDown />;

    if (order.direction === "asc") return <ArrowUp />;

    return <ArrowDown />;
  };

  return (
    <>
      <Helmet title="Níveis" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Níveis</h1>
          <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
            <DialogTrigger>
              <Button size="xs" onClick={handleOpenDialog}>
                <Plus />
                Cadastrar nível
              </Button>
            </DialogTrigger>

            <LevelCreateDialog
              onUpdate={() => {
                onUpdate();
                setOpenCreateDialog(false);
              }}
            />
          </Dialog>
        </div>

        <div className="space-y-2.5">
          <LevelFilters onSearch={onSearch} />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleClickOrder("id")}
                    >
                      ID
                      {getArrowIcon("id")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleClickOrder("nivel")}
                    >
                      Nivel
                      {getArrowIcon("nivel")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    Quantidade de desenvolvedores associados
                  </TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Loader2 className="animate-spin" />
                    </TableCell>
                  </TableRow>
                ) : (
                  levels?.map((lvl) => (
                    <LevelTableRow
                      level={lvl}
                      onUpdate={onUpdate}
                      key={lvl.id}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <Pagination
            setPage={updatePage}
            pageIndex={page}
            perPage={perPage}
            lastPage={lastPage}
            totalCount={total}
          />
        </div>
      </div>
    </>
  );
};
