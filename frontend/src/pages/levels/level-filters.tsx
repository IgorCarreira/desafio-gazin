import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LevelFilterRequest } from "@/types/level";
import { Search, X } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

interface LevelFiltersProps {
  onSearch: (values: LevelFilterRequest) => void;
}

export const LevelFilters = ({ onSearch }: LevelFiltersProps) => {
  const [searchParams] = useSearchParams();

  const defaultValues = useMemo(() => {
    const values: Record<string, any> = {};

    searchParams.forEach((value, key) => {
      if (key !== "current_page") {
        values[key] = (isNaN(Number(value)) ? value : Number(value)) || null;
      }
    });

    return values as LevelFilterRequest;
  }, [searchParams]);

  const { register, handleSubmit, reset } = useForm<LevelFilterRequest>({
    defaultValues,
  });

  const onSubmit = (data: LevelFilterRequest) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v)
    ) as LevelFilterRequest;
    onSearch(cleanedData);
  };

  const clearFilters = () => {
    reset({ nivel: null });
    onSearch({});
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID do nível"
        className="h-8 w-auto"
        {...register("id")}
      />
      <Input
        placeholder="Nível"
        className="h-8 w-[320px]"
        {...register("nivel")}
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
