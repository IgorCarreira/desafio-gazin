import { fetcher } from "@/api/fetcher";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Developer, DeveloperBodyRequest } from "@/types/developer";
import { FetchDataResponse } from "@/types/fetch-data-response";
import { Level } from "@/types/level";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";

interface DeveloperPatchDialogProps {
  developer: Developer & { nivel_id: number };
  onUpdate: () => void;
  open: boolean;
}

export const DeveloperPatchDialog = ({
  developer,
  onUpdate,
  open,
}: DeveloperPatchDialogProps) => {
  const { data: levelOptions } = useSWR<FetchDataResponse<Level>>(
    open ? "http://localhost:3030/api/niveis" : null,
    fetcher
  );

  const { register, handleSubmit, control } = useForm<DeveloperBodyRequest>({
    defaultValues: developer,
  });

  const onSubmit: SubmitHandler<DeveloperBodyRequest> = async (data) => {
    const response = await fetch(
      `http://localhost:3030/api/desenvolvedores/${developer.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      return toast.error("Ocorreu um erro ao atualizar o desenvolvedor");
    }

    toast.success("Desenvolvedor atualizado com sucesso!");
    onUpdate();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar</DialogTitle>
      </DialogHeader>

      <form
        id="developerForm"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-3"
      >
        <div className="space-y-2">
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" {...register("nome")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sexo">Sexo</Label>
          <Input id="sexo" {...register("sexo")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="data_nascimento">Data de nascimento</Label>
          <Input id="data_nascimento" {...register("data_nascimento")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nivel_id">Nível</Label>
          <Controller
            name="nivel_id"
            control={control}
            rules={{ required: "O nível é obrigatório" }}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={String(field.value)}
              >
                <SelectTrigger>
                  <SelectValue />
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
        </div>

        <div className="space-y-2 col-span-2">
          <Label htmlFor="hobby">Hobby</Label>
          <Input id="hobby" {...register("hobby")} />
        </div>
      </form>
      <DialogClose>
        <Button
          type="submit"
          size="xs"
          className="ml-auto"
          form="developerForm"
        >
          Aplicar alterações
        </Button>
      </DialogClose>
    </DialogContent>
  );
};
