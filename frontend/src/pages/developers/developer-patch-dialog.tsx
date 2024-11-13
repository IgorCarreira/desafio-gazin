import { fetcher } from "@/api/fetcher";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { DatePickerField } from "@/components/ui/form/date-picker-field";
import { SelectField } from "@/components/ui/form/select-field";
import { TextInputField } from "@/components/ui/form/text-input-field";
import { Developer } from "@/types/developer";
import { FetchDataResponse } from "@/types/fetch-data-response";
import { Level } from "@/types/level";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import { z } from "zod";

interface DeveloperPatchDialogProps {
  developer: Developer & { nivel_id: number };
  onUpdate: () => void;
  open: boolean;
}

const developerPatchSchema = z.object({
  nome: z.string().min(1, "Obrigatório"),
  data_nascimento: z.string(),
  sexo: z
    .string()
    .min(1, "Obrigatório")
    .max(1, 'Deve conter apenas uma letra: "m" ou "f"'),
  nivel_id: z.coerce.number({ required_error: "Obrigatório" }),
  hobby: z.string().min(1, "Obrigatório"),
});

type DeveloperPatchSchema = z.infer<typeof developerPatchSchema>;

export const DeveloperPatchDialog = ({
  developer,
  onUpdate,
  open,
}: DeveloperPatchDialogProps) => {
  const { data: levelOptions } = useSWR<FetchDataResponse<Level>>(
    open ? `${import.meta.env.VITE_API_BASE_URL}/api/niveis` : null,
    fetcher
  );

  const form = useForm<DeveloperPatchSchema>({
    defaultValues: developer,
  });

  const onSubmit: SubmitHandler<DeveloperPatchSchema> = async (data) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/desenvolvedores/${
        developer.id
      }`,
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
      <Form {...form}>
        <form
          id="developerForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3"
        >
          <TextInputField control={form.control} name="nome" label="Nome" />

          <TextInputField control={form.control} name="sexo" label="Sexo" />

          <DatePickerField
            control={form.control}
            label="Data de nascimento"
            name="data_nascimento"
          />

          <SelectField
            control={form.control}
            label="Nível"
            options={levelOptions?.data || []}
            name="nivel_id"
            labelKey="nivel"
            valueKey="id"
          />

          <TextInputField
            control={form.control}
            label="Hooby"
            name="hobby"
            className="col-span-2"
          />
        </form>
      </Form>

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
