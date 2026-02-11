import { Field, FieldLabel } from '@ui/Field/Field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/Select/Select';

export const LimitPageSelector = ({ setPage, setLimit }) => {
  const handleSetLimit = (value) => {
    setPage(1);
    setLimit(value);
  };

  return (
    <Field orientation="horizontal" className="w-fit">
      <FieldLabel htmlFor="select-rows-per-page" className="text-sm">
        Mostrar valores
      </FieldLabel>
      <Select defaultValue="10" onValueChange={handleSetLimit}>
        <SelectTrigger className="w-18" id="select-rows-per-page">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="start" className="w-18">
          <SelectGroup>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
};
