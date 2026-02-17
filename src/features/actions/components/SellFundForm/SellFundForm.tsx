import { useMemo } from 'react';
import { Button } from '@ui/Button/Button';
import { DialogFooter, DialogClose } from '@ui/Dialog/Dialog';
import { Field, FieldError, FieldLabel } from '@ui/Field/Field';
import { Input } from '@ui/Input/Input';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSellFund } from '@features/actions/queries/useSellFund';
import { createSellSchema, type SellFormData } from '@domain/action';
import type { FundActionFormProps } from '@features/actions/types';

export const SellFundForm = ({ action, onSuccess, data }: FundActionFormProps) => {
  const maxQuantity = data?.quantity ?? 0;
  const sellSchema = useMemo(() => createSellSchema(maxQuantity), [maxQuantity]);

  const form = useForm<SellFormData>({
    resolver: zodResolver(sellSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const { mutate: sellFund } = useSellFund({ onSuccess: onSuccess ?? (() => {}) });

  if (!data) return null;

  const onSubmit = (formData: SellFormData) => {
    sellFund({
      fundId: data.id,
      amount: formData.amount,
      fundName: data.name,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <p className="text-sm">
          Cantidad disponible: <span className="font-bold">{data.quantity}</span>
        </p>
      </div>
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
    </div>
  );
};
