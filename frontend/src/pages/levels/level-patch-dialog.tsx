import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Level, LevelBodyRequest } from "@/types/level";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface LevelPatchDialogProps {
  level: Level;
  onUpdate: () => void;
}

export const LevelPatchDialog = ({
  level,
  onUpdate,
}: LevelPatchDialogProps) => {
  const { register, handleSubmit } = useForm<LevelBodyRequest>({
    defaultValues: level,
  });

  const onSubmit: SubmitHandler<LevelBodyRequest> = async (data) => {
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

      <form id="levelForm" onSubmit={handleSubmit(onSubmit)} className="flex">
        <div className="space-y-2 w-full">
          <Label htmlFor="nivel">Nível</Label>
          <Input id="nivel" {...register("nivel")} />
        </div>
      </form>
      <DialogClose>
        <Button type="submit" size="xs" className="ml-auto" form="levelForm">
          Aplicar alterações
        </Button>
      </DialogClose>
    </DialogContent>
  );
};
