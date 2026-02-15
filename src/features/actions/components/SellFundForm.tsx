import { useMemo } from 'react';
import { Button } from '@ui/Button/Button';
import { DialogFooter, DialogClose } from '@ui/Dialog/Dialog';
import { Field, FieldError, FieldLabel } from '@ui/Field/Field';
import { Input } from '@ui/Input/Input';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSellFund } from '@features/actions/queries/useSellFund';
import { sellFundSchemaType, type SellFundFormData } from '@domain/funds/validation';
import type { FundActionFormProps } from '@features/actions/types';

export const SellFundForm = ({ action, onSuccess, data }: FundActionFormProps) => {
  const maxPosition = data.position ?? 0;
  const sellFundSchema = useMemo(() => sellFundSchemaType(maxPosition), [maxPosition]);

  const form = useForm<SellFundFormData>({
    resolver: zodResolver(sellFundSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const { mutate: sellFund } = useSellFund({ onSuccess });

  const onSubmit = (formData: SellFundFormData) => {
    sellFund({
      fundId: data.id,
      amount: formData.amount,
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
