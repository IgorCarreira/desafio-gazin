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
import { format, getMonth, getYear, parse, setMonth, setYear } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface DatePickerFieldProps {
  control: any;
  name: string;
  label: string;
  startYear?: number;
  endYear?: number;
}

export const DatePickerField = ({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  control,
  name,
  label,
}: DatePickerFieldProps) => {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const years = Array.from(
    { length: endYear - startYear + 2 },
    (_, index) => startYear + index
  );

  const RenderField = ({ field }: any) => {
    const [date, setDate] = useState<Date>(field.value);

    const handleMonthChange = (month: string) => {
      const newDate = setMonth(date, months.indexOf(month));
      setDate(newDate);
    };

    const handleYearChange = (year: string) => {
      const newDate = setYear(date, parseInt(year));
      setDate(newDate);
    };

    return (
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
            <div className="flex justify-between p-2">
              <Select
                onValueChange={handleMonthChange}
                value={months[getMonth(date)]}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={handleYearChange}
                value={getYear(date).toString()}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Calendar
              mode="single"
              month={date}
              selected={
                field.value
                  ? parse(field.value, "yyyy-MM-dd", new Date())
                  : undefined
              }
              onSelect={(date) => {
                if (date) {
                  setDate(date);
                }
                field.onChange(date ? format(date, "yyyy-MM-dd") : date);
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    );
  };

  return <FormField control={control} name={name} render={RenderField} />;
};
