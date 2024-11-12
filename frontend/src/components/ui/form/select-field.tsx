// SelectField.tsx
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps {
  control: any;
  label: string;
  name: string;
  valueKey?: string;
  labelKey?: string;
  options: any[];
}

export const SelectField = ({
  control,
  name,
  label,
  options,
  valueKey = "value",
  labelKey = "label",
}: SelectFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select
          onValueChange={field.onChange}
          defaultValue={String(field.value)}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem
                value={String(option[valueKey])}
                key={option[valueKey]}
              >
                {option[labelKey]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItem>
    )}
  />
);
