import { fetcher } from "@/api/fetcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeveloperFilterRequest } from "@/types/developer";
import { FetchDataResponse } from "@/types/fetch-data-response";
import { Level } from "@/types/level";
import { Search, X } from "lucide-react";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";

interface DeveloperFiltersProps {
  onSearch: (values: DeveloperFilterRequest) => void;
}

export const DeveloperFilters = ({ onSearch }: DeveloperFiltersProps) => {
  const { data: levelOptions } = useSWR<FetchDataResponse<Level>>(
    "http://localhost:3030/api/niveis",
    fetcher
  );
  const [searchParams] = useSearchParams();

  const defaultValues = useMemo(() => {
    const values: Record<string, any> = {};

    searchParams.forEach((value, key) => {
      if (key !== "current_page") {
        values[key] = (isNaN(Number(value)) ? value : Number(value)) || null;
      }
    });

    return values as DeveloperFilterRequest;
  }, [searchParams]);

  const { register, handleSubmit, reset, control } =
    useForm<DeveloperFilterRequest>({
      defaultValues,
    });

  const onSubmit = (data: DeveloperFilterRequest) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v)
    ) as DeveloperFilterRequest;
    onSearch(cleanedData);
  };

  const clearFilters = () => {
    reset({ id: null, nivel_id: null, nome: null });
    onSearch({});
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID do desenvolvedor"
        className="h-8 w-auto"
        {...register("id")}
      />
      <Input
        placeholder="Nome do desenvolvedor"
        className="h-8 w-[320px]"
        {...register("nome")}
      />
      <Controller
        name="nivel_id"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={String(field.value)}>
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue placeholder="Nível " />
            </SelectTrigger>
            <SelectContent>
              {levelOptions?.data?.map((option) => (
                <SelectItem value={String(option.id)} key={option.id}>
                  {option.nivel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 size-4" />
        Filtrar resultados
      </Button>

      <Button type="button" onClick={clearFilters} variant="outline" size="xs">
        <X className="mr-2 size-4" />
        Remover filtros
      </Button>
    </form>
  );
};
