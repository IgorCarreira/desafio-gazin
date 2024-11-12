// DatePickerField.tsx
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface DatePickerFieldProps {
  control: any;
  name: string;
  label: string;
}

export const DatePickerField = ({
  control,
  name,
  label,
}: DatePickerFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-2">
        <FormLabel>{label}</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant={"outline"} className="w-full">
                {field.value
                  ? format(
                      parse(field.value, "yyyy-MM-dd", new Date()),
                      "dd/MM/yyyy"
                    )
                  : null}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={
                field.value
                  ? parse(field.value, "yyyy-MM-dd", new Date())
                  : undefined
              }
              onSelect={(date) =>
                field.onChange(date ? format(date, "yyyy-MM-dd") : date)
              }
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
);
