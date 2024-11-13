import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Developer } from "@/types/developer";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import { DeveloperAlertDialog } from "./developer-alert-dialog";
import { DeveloperPatchDialog } from "./developer-patch-dialog";
import { toast } from "sonner";

interface DeveloperTableRowProps {
  developer: Developer;
  onUpdate: () => void;
}

const DeveloperTableRow = ({ developer, onUpdate }: DeveloperTableRowProps) => {
  const dataNascimento = new Date(developer.data_nascimento);
  const [open, setOpen] = useState(false);

  const handleClickDelete = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/desenvolvedores/${
        developer.id
      }`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      toast.error("Erro ao remover desenvolvedor");
      return;
    }
    toast.success("Desenvolvedor removido");

    onUpdate();
  };

  const handleClickEdit = () => {
    setOpen(true);
  };

  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{developer.id}</TableCell>
      <TableCell className="font-medium">{developer.nome}</TableCell>
      <TableCell className="font-medium">
        {developer.sexo.toLowerCase() === "f" ? "Feminino" : "Masculino"}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {dataNascimento.toLocaleDateString("pt-BR")}
      </TableCell>
      <TableCell className="font-medium">{developer.idade}</TableCell>
      <TableCell className="font-medium">{developer.hobby}</TableCell>
      <TableCell className="font-medium">{developer.nivel.nivel}</TableCell>

      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs" onClick={handleClickEdit}>
              <Pencil className="mr-1 size-3" />
              Editar
            </Button>
          </DialogTrigger>
          <DeveloperPatchDialog
            open={open}
            developer={{ ...developer, nivel_id: developer.nivel.id }}
            onUpdate={onUpdate}
          />
        </Dialog>
      </TableCell>

      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="ghost" size="xs">
              <X className=" size-3" />
              Remover
            </Button>
          </AlertDialogTrigger>
          <DeveloperAlertDialog onContinue={handleClickDelete} />
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

export default DeveloperTableRow;
