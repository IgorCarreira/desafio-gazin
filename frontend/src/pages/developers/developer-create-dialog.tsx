import { fetcher } from "@/api/fetcher";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { DatePickerField } from "@/components/ui/form/date-picker-field";
import { SelectField } from "@/components/ui/form/select-field";
import { TextInputField } from "@/components/ui/form/text-input-field";
import { FetchDataResponse } from "@/types/fetch-data-response";
import { Level } from "@/types/level";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import { z } from "zod";
interface DeveloperCreateDialogProps {
  onUpdate: () => void;
  open: boolean;
}

const developerCreateSchema = z.object({
  nome: z.string().min(1, "Obrigatório"),
  data_nascimento: z.string(),
  sexo: z
    .string()
    .min(1, "Obrigatório")
    .max(1, 'Deve conter apenas uma letra: "m" ou "f"'),
  nivel_id: z.coerce.number({ required_error: "Obrigatório" }),
  hobby: z.string().min(1, "Obrigatório"),
});

type DeveloperCreateSchema = z.infer<typeof developerCreateSchema>;

export const DeveloperCreateDialog = ({
  onUpdate,
  open,
}: DeveloperCreateDialogProps) => {
  const { data: levelOptions } = useSWR<FetchDataResponse<Level>>(
    open ? "http://localhost:3030/api/niveis" : null,
    fetcher
  );

  const form = useForm<DeveloperCreateSchema>({
    resolver: zodResolver(developerCreateSchema),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<DeveloperCreateSchema> = async (data) => {
    const response = await fetch(`http://localhost:3030/api/desenvolvedores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return toast.error("Ocorreu um erro ao criar o desenvolvedor");
    }
    form.reset();
    toast.success("Desenvolvedor criado com sucesso!");
    onUpdate();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cadastrar desenvolvedor</DialogTitle>
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

      <Button type="submit" size="xs" className="ml-auto" form="developerForm">
        Cadastrar desenvolvedor
      </Button>
    </DialogContent>
  );
};
