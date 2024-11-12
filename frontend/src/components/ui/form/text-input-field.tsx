// TextInputField.tsx
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TextInputFieldProps {
  control: any;
  name: string;
  label: string;
  className?: string;
}

export const TextInputField = ({
  control,
  name,
  label,
  className,
}: TextInputFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn("space-y-2", className)}>
        <FormLabel>{label}</FormLabel>
        <Input {...field} />
        <FormMessage />
      </FormItem>
    )}
  />
);
