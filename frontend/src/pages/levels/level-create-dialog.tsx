import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { TextInputField } from "@/components/ui/form/text-input-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface LevelPatchDialogProps {
  onUpdate: () => void;
}

const levelCreateSchema = z.object({
  nivel: z.string().min(1, "Obrigatório"),
});

type LevelCreateSchema = z.infer<typeof levelCreateSchema>;

export const LevelCreateDialog = ({ onUpdate }: LevelPatchDialogProps) => {
  const form = useForm<LevelCreateSchema>({
    resolver: zodResolver(levelCreateSchema),
  });

  const onSubmit: SubmitHandler<LevelCreateSchema> = async (data) => {
    const response = await fetch(`http://localhost:3030/api/niveis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return toast.error("Ocorreu um erro ao cadastrar o nível");
    }

    toast.success("Nível cadastrado com sucesso!");
    onUpdate();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cadastrar</DialogTitle>
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
        Cadastrar nível
      </Button>
    </DialogContent>
  );
};
