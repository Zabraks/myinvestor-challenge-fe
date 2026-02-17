import { Button } from '@ui/Button/Button';
import { DialogFooter, DialogClose } from '@ui/Dialog/Dialog';
import { Field, FieldDescription, FieldError, FieldLabel } from '@ui/Field/Field';
import { Input } from '@ui/Input/Input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@ui/Select/Select';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTransferFund } from '@features/actions/queries/useTransferFund';
import { usePortfolio } from '@features/portfolio/queries/usePortfolio';
import type { FundActionFormProps } from '@features/actions/types';
import { createTransferSchema, type TransferFormData } from '@domain/action';

export const TransferFundForm = ({ action, onSuccess, data, fundId }: FundActionFormProps) => {
  const { data: portfolio, isLoading } = usePortfolio();
  const maxQuantity = data?.quantity ?? 0;

  const form = useForm<TransferFormData>({
    resolver: zodResolver(createTransferSchema(maxQuantity)),
    defaultValues: {
      amount: 0,
      fund: '',
    },
  });

  const { mutate: transferFund } = useTransferFund(onSuccess ?? (() => {}));

  if (!data || !fundId) return null;

  const onSubmit = (formData: TransferFormData) => {
    transferFund({
      fromFundId: fundId,
      fromFundName: data.name,
      toFundId: formData.fund,
      toFundName: portfolio?.items.find((item) => item.id === formData.fund)?.name ?? '',
      amount: formData.amount,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <p className="text-sm">
          Cantidad disponible: <span className="font-bold">{data.quantity}</span>
        </p>
      </div>
      <form
        id={`form-${action}-fund`}
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
        <Controller
          name="fund"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Traspasar a<span className="text-destructive">*</span>
              </FieldLabel>
              <FieldDescription>
                Elige un fondo disponible para realizar el traspaso.
              </FieldDescription>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                disabled={isLoading}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} className="w-full max-w-48">
                  <SelectValue placeholder="Elige un fondo" />
                </SelectTrigger>
                <SelectContent>
                  {portfolio?.items
                    .filter((item) => item.id !== fundId)
                    .map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </form>
      <DialogFooter className="pt-8">
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
