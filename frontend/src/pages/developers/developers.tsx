import { Pagination } from "@/components/pagination";
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
import { Helmet } from "react-helmet-async";
import { DeveloperFilters } from "./developer-filters";
import DeveloperTableRow from "./developers-table-row";

export const Developers = () => {
  const { page, query, updatePage, updateQuery } =
    useFilter<DeveloperFilterRequest>();

  const {
    data: developers,
    lastPage,
    perPage,
    total,
    mutate,
  } = useFetchData<Developer>(
    "http://localhost:3030/api/desenvolvedores",
    page,
    query
  );

  const onUpdate = () => {
    mutate();
  };

  const onSearch = (newSearchParams: DeveloperFilterRequest) => {
    updateQuery(newSearchParams);
    mutate();
  };

  return (
    <>
      <Helmet title="Desenvolvedores" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Desenvolvedores</h1>

        <div className="space-y-2.5">
          <DeveloperFilters onSearch={onSearch} />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Sexo</TableHead>
                  <TableHead>Data de nascimento</TableHead>
                  <TableHead>Idade</TableHead>
                  <TableHead>Hobby</TableHead>
                  <TableHead>Nível</TableHead>
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
