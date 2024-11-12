import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetchData from "@/hooks/useFetchData";
import { useFilter } from "@/hooks/useFilter";
import { Level, LevelFilterRequest } from "@/types/level";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { LevelCreateDialog } from "./level-create-dialog";
import { LevelFilters } from "./level-filters";
import { LevelTableRow } from "./level-table-row";

export const Levels = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const { page, query, updatePage, updateQuery } =
    useFilter<LevelFilterRequest>();

  const {
    data: levels,
    lastPage,
    perPage,
    total,
    mutate,
  } = useFetchData<Level>("http://localhost:3030/api/niveis", page, query);

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
                  <TableHead>ID</TableHead>
                  <TableHead className="w-[80%]">Nível</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {levels?.map((lvl) => (
                  <LevelTableRow level={lvl} onUpdate={onUpdate} key={lvl.id} />
                ))}
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
