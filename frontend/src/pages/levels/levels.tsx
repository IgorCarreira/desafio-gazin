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
import { Level, LevelFilterRequest } from "@/types/level";
import { Helmet } from "react-helmet-async";
import { LevelTableRow } from "./level-table-row";
import { LevelFilters } from "./level-filters";

export const Levels = () => {
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

  return (
    <>
      <Helmet title="Desenvolvedores" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Desenvolvedores</h1>

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
