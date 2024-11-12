import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { TextInputField } from "@/components/ui/form/text-input-field";
import { Level } from "@/types/level";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface LevelPatchDialogProps {
  level: Level;
  onUpdate: () => void;
}

const levelPatchSchema = z.object({
  nivel: z.string().min(1, "Obrigatório"),
});

type LevelPatchSchema = z.infer<typeof levelPatchSchema>;

export const LevelPatchDialog = ({
  level,
  onUpdate,
}: LevelPatchDialogProps) => {
  const form = useForm<LevelPatchSchema>({
    defaultValues: level,
    resolver: zodResolver(levelPatchSchema),
  });

  const onSubmit: SubmitHandler<LevelPatchSchema> = async (data) => {
    const response = await fetch(
      `http://localhost:3030/api/niveis/${level.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      return toast.error("Ocorreu um erro ao atualizar o nível");
    }

    toast.success("Nível atualizado com sucesso!");
    onUpdate();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          id="levelForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex"
        >
          <TextInputField
            label="Nível"
            name="nivel"
            control={form.control}
            className="w-full"
          />
        </form>
      </Form>
      <Button type="submit" size="xs" className="ml-auto" form="levelForm">
        Aplicar alterações
      </Button>
    </DialogContent>
  );
};
