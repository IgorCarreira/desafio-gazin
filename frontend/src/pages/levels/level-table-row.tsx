import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Level } from "@/types/level";
import { Pencil, X } from "lucide-react";
import { toast } from "sonner";
import { LevelPatchDialog } from "./level-patch-dialog";
import { LevelAlertDialog } from "./level-alert-dialog";
import { useState } from "react";

interface LevelTableRowProps {
  level: Level;
  onUpdate: () => void;
}

export const LevelTableRow = ({ level, onUpdate }: LevelTableRowProps) => {
  const [openPatchDialog, setOpenPatchDialog] = useState(false);

  const handleClickDelete = async () => {
    const response = await fetch(
      `http://localhost:3030/api/niveis/${level.id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      toast.error("Erro ao remover nível");
      return;
    }
    toast.success("Nível removido");

    onUpdate();
  };

  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{level.id}</TableCell>
      <TableCell className="font-medium">{level.nivel}</TableCell>
      <TableCell className="font-medium">
        {level.quantidade_desenvolvedores}
      </TableCell>

      <TableCell>
        <Dialog open={openPatchDialog} onOpenChange={setOpenPatchDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Pencil className="mr-1 size-3" />
              Editar
            </Button>
          </DialogTrigger>
          <LevelPatchDialog
            level={level}
            onUpdate={() => {
              onUpdate();
              setOpenPatchDialog(false);
            }}
          />
        </Dialog>
      </TableCell>

      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              variant="ghost"
              size="xs"
              disabled={level.quantidade_desenvolvedores > 0}
            >
              <X className=" size-3" />
              Remover
            </Button>
          </AlertDialogTrigger>
          <LevelAlertDialog onContinue={handleClickDelete} />
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};
