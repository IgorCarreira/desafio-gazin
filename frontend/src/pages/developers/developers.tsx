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
import { Developer, DeveloperFilterRequest } from "@/types/developer";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Loader2,
  UserRoundPlus,
} from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { DeveloperCreateDialog } from "./developer-create-dialog";
import { DeveloperFilters } from "./developer-filters";
import DeveloperTableRow from "./developers-table-row";

export const Developers = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const { page, query, updatePage, updateQuery, updateOrder, order } =
    useFilter<DeveloperFilterRequest>();

  const {
    data: developers,
    lastPage,
    perPage,
    total,
    mutate,
    isLoading,
  } = useFetchData<Developer>(
    `${import.meta.env.VITE_API_BASE_URL}/api/desenvolvedores`,
    page,
    query
  );

  const onUpdate = () => {
    mutate();
    setOpenCreateDialog(false);
  };

  const onSearch = (newSearchParams: DeveloperFilterRequest) => {
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <>
      <Helmet title="Desenvolvedores" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Desenvolvedores</h1>
          <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
            <DialogTrigger>
              <Button size="xs" onClick={handleOpenDialog}>
                <UserRoundPlus />
                Cadastrar desenvolvedor
              </Button>
            </DialogTrigger>

            <DeveloperCreateDialog
              onUpdate={onUpdate}
              open={openCreateDialog}
            />
          </Dialog>
        </div>

        <div className="space-y-2.5">
          <DeveloperFilters onSearch={onSearch} />

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
                      onClick={() => handleClickOrder("nome")}
                    >
                      Nome
                      {getArrowIcon("nome")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleClickOrder("sexo")}
                    >
                      Sexo
                      {getArrowIcon("sexo")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleClickOrder("data_nascimento")}
                    >
                      Data de nascimento
                      {getArrowIcon("data_nascimento")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleClickOrder("data_nascimento")}
                    >
                      Idade
                      {getArrowIcon("data_nascimento")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleClickOrder("hobby")}
                    >
                      Hobby
                      {getArrowIcon("hobby")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleClickOrder("nivel_id")}
                    >
                      Nível
                      {getArrowIcon("nivel_id")}
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {developers?.map((dev) => (
                  <DeveloperTableRow
                    developer={dev}
                    onUpdate={onUpdate}
                    key={dev.id}
                  />
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
