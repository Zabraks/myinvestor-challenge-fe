import { Button } from '@ui/Button/Button';
import { DialogFooter, DialogClose } from '@ui/Dialog/Dialog';
import { Field, FieldError, FieldLabel } from '@ui/Field/Field';
import { Input } from '@ui/Input/Input';

import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useBuyFund } from '@features/actions/queries/useBuyFund';

export const BuyFundForm = ({ action, onSuccess, data }) => {
  const formSchema = z.object({
    amount: z
      .number({
        required_error: 'El campo debe ser obligatorio',
        invalid_type_error: 'El valor introducido ha de ser un número',
      })
      .nonnegative('La cantidad no puede ser negativa')
      .max(10000, 'La cuantía no puede superar los 10000€'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const { mutate: buyFund } = useBuyFund(onSuccess);

  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    buyFund({
      fundId: data.id,
      amount: formData.amount,
      fundName: data.name,
    });
  };

  return (
    <>
      <form id={`form-${action}-fund`} onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="amount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Valor
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Introduce un valor"
                autoComplete="off"
                type="number"
                onChange={(e) =>
                  field.onChange(e.target.value === '' ? '' : Number(e.target.value))
                }
                value={field.value ?? ''}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cerrar</Button>
        </DialogClose>
        <Button type="submit" form={`form-${action}-fund`}>
          Enviar
        </Button>
      </DialogFooter>
    </>
  );
};
