import * as z from 'zod';
import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/20/solid';
import {
  Controller,
  useFieldArray,
  useWatch,
  type ControllerRenderProps,
  type UseFormReturn,
} from 'react-hook-form';
import {
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Field,
  FieldError,
} from '@/components/fields';
import { Input } from '@/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { Calendar } from '@/components/calendar';
import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/select';
import { Button } from '@/components/button';
import { formatDate } from '@/lib/utils';
import { InvoiceFormSchema } from '@/features/invoices/schemas';

type InvoiceFormValues = z.infer<typeof InvoiceFormSchema>;

type InvoiceFormFieldsProps = {
  form: UseFormReturn<InvoiceFormValues>;
  isSubmitting: boolean;
};

const paymentTermsChoices = [
  { label: 'Net 1 day', value: 1 },
  { label: 'Net 7 days', value: 7 },
  { label: 'Net 14 days', value: 14 },
  { label: 'Net 30 days', value: 30 },
];

export function InvoiceFormFields({ form, isSubmitting }: InvoiceFormFieldsProps) {
  const [openCalendarInput, setOpenCalendarInput] = useState(false);

  function handleOpenCalendarInput() {
    setOpenCalendarInput(true);
  }

  function handleCloseCalendarInput() {
    setOpenCalendarInput(false);
  }

  function handleSelectCalendarInput(
    day: Date,
    field: ControllerRenderProps<InvoiceFormValues, 'dateIssued'>,
  ) {
    field.onChange(day);
    handleCloseCalendarInput();
  }

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'items' });
  const fieldItems = useWatch({
    control: form.control,
    name: 'items',
  });

  return (
    <div className="space-y-10">
      <FieldSet className="space-y-6">
        <FieldLegend>Bill From</FieldLegend>
        <FieldGroup className="grid grid-cols-2 gap-6">
          <Controller
            control={form.control}
            name="senderAddress.street"
            render={({ field, fieldState }) => (
              <Field
                fieldId={field.name}
                fieldError={fieldState.error}
                className="col-span-2 space-y-1">
                <FieldLabel>Street Address</FieldLabel>
                <Input {...field} disabled={isSubmitting} />
                <FieldError />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="senderAddress.city"
            render={({ field, fieldState }) => (
              <Field
                fieldId={field.name}
                fieldError={fieldState.error}
                className="col-span-1 space-y-1">
                <FieldLabel>City</FieldLabel>
                <Input {...field} disabled={isSubmitting} />
                <FieldError />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="senderAddress.postCode"
            render={({ field, fieldState }) => (
              <Field
                fieldId={field.name}
                fieldError={fieldState.error}
                className="col-span-1 space-y-1">
                <FieldLabel>Post Code</FieldLabel>
                <Input {...field} disabled={isSubmitting} />
                <FieldError />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="senderAddress.country"
            render={({ field, fieldState }) => (
              <Field
                fieldId={field.name}
                fieldError={fieldState.error}
                className="col-span-2 space-y-1">
                <FieldLabel>Country</FieldLabel>
                <Input {...field} disabled={isSubmitting} />
                <FieldError />
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
      <FieldSet className="space-y-6">
        <FieldLegend>Bill To</FieldLegend>
        <FieldGroup className="grid grid-cols-2 gap-6">
          <Controller
            control={form.control}
            name="clientName"
            render={({ field, fieldState }) => (
              <Field
                fieldId={field.name}
                fieldError={fieldState.error}
                className="col-span-2 space-y-1">
                <FieldLabel>Client's Name</FieldLabel>
                <Input {...field} disabled={isSubmitting} />
                <FieldError />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="clientEmail"
            render={({ field, fieldState }) => (
              <Field
                fieldId={field.name}
                fieldError={fieldState.error}
                className="col-span-2 space-y-1">
                <FieldLabel>Client's Email</FieldLabel>
                <Input {...field} disabled={isSubmitting} />
                <FieldError />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="clientAddress.street"
            render={({ field, fieldState }) => (
              <Field
                fieldId={field.name}
                fieldError={fieldState.error}
                className="col-span-2 space-y-1">
                <FieldLabel>Street Address</FieldLabel>
                <Input {...field} disabled={isSubmitting} />
                <FieldError />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="clientAddress.city"
            render={({ field, fieldState }) => (
              <Field
                fieldId={field.name}
                fieldError={fieldState.error}
                className="col-span-1 space-y-1">
                <FieldLabel>City</FieldLabel>
                <Input {...field} disabled={isSubmitting} />
                <FieldError />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="clientAddress.postCode"
            render={({ field, fieldState }) => (
              <Field
                fieldId={field.name}
                fieldError={fieldState.error}
                className="col-span-1 space-y-1">
                <FieldLabel>Post Code</FieldLabel>
                <Input {...field} disabled={isSubmitting} />
                <FieldError />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="clientAddress.country"
            render={({ field, fieldState }) => (
              <Field
                fieldId={field.name}
                fieldError={fieldState.error}
                className="col-span-2 space-y-1">
                <FieldLabel>Country</FieldLabel>
                <Input {...field} disabled={isSubmitting} />
                <FieldError />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="dateIssued"
            render={({ field, fieldState }) => (
              <Field
                fieldId={field.name}
                fieldError={fieldState.error}
                className="xs:col-span-1 col-span-2 space-y-1">
                <FieldLabel>Invoice Date</FieldLabel>
                <Popover open={openCalendarInput} onOpenChange={setOpenCalendarInput}>
                  <PopoverTrigger onClick={handleOpenCalendarInput}>
                    {formatDate(field.value)}
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onDayClick={(day) => handleSelectCalendarInput(day, field)}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
                <FieldError />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="paymentTerms"
            render={({ field, fieldState }) => (
              <Field
                fieldId={field.name}
                fieldError={fieldState.error}
                className="xs:col-span-1 col-span-2 space-y-1">
                <FieldLabel>Invoice Date</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  items={paymentTermsChoices}
                  onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue>
                      {paymentTermsChoices.find((c) => c.value === field.value)?.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {paymentTermsChoices.map(({ label, value }) => (
                        <SelectItem key={label} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field
                fieldId={field.name}
                fieldError={fieldState.error}
                className="col-span-2 space-y-1">
                <FieldLabel>Project Description</FieldLabel>
                <Input {...field} disabled={isSubmitting} />
                <FieldError />
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
      <FieldSet className="space-y-6">
        <FieldLegend className="text-lg">Items</FieldLegend>
        <FieldGroup className="divide-y divide-gray-200">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-6 gap-4 py-6 first:pt-0 last:pb-0">
              <Controller
                control={form.control}
                name={`items.${index}.name`}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    className="col-span-6 space-y-1"
                    fieldId={controllerField.name}
                    fieldError={fieldState.error}>
                    <FieldLabel>Item Name</FieldLabel>
                    <Input {...controllerField} />
                    <FieldError />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name={`items.${index}.quantity`}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    className="col-span-2 space-y-1"
                    fieldId={controllerField.name}
                    fieldError={fieldState.error}>
                    <FieldLabel>Qty.</FieldLabel>
                    <Input
                      {...controllerField}
                      type="number"
                      min={0}
                      step={1}
                      onClick={(e) => e.currentTarget.select()}
                    />
                    <FieldError />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name={`items.${index}.price`}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    className="col-span-2 space-y-1"
                    fieldId={controllerField.name}
                    fieldError={fieldState.error}>
                    <FieldLabel>Price</FieldLabel>
                    <Input
                      {...controllerField}
                      type="number"
                      min={0}
                      step="any"
                      onClick={(e) => e.currentTarget.select()}
                    />
                    <FieldError />
                  </Field>
                )}
              />
              <div className="col-span-2 space-y-1">
                <div className="text-bunker-400 block text-[15px] leading-none font-medium select-none">
                  Total
                </div>
                <div className="flex items-center gap-x-3">
                  <div className="flex-1 py-3.5 text-[15px] leading-none font-semibold">
                    {(
                      (fieldItems.at(index)?.quantity || 0) * (fieldItems.at(index)?.price || 0)
                    ).toFixed(2)}
                  </div>
                  {fields.length > 1 && fields.length - 1 === index && (
                    <button
                      className="flex-none text-gray-400 hover:text-red-600"
                      onClick={() => remove(index)}>
                      <TrashIcon className="size-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </FieldGroup>
        <Button
          variant="ghost"
          className="hover:bg-primary-100 text-primary-600 hover:text-primary-800 w-full bg-transparent"
          onClick={() => append({ name: '', quantity: 0, price: 0 })}>
          + Add Item
        </Button>
      </FieldSet>
    </div>
  );
}
