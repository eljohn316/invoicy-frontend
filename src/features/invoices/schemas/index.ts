import * as z from 'zod';

const Address = z.object({
  street: z.string().min(1, { error: "Can't be empty" }),
  city: z.string().min(1, { error: "Can't be empty" }),
  postCode: z.string().min(1, { error: "Can't be empty" }),
  country: z.string().min(1, { error: "Can't be empty" }),
});

const Item = z.object({
  name: z.string().min(1, "Can't be empty"),
  quantity: z.coerce.number().default(0) as unknown as z.ZodNumber,
  price: z.coerce.number().default(0) as unknown as z.ZodNumber,
});

export const InvoiceFormSchema = z.object({
  senderAddress: Address,
  clientName: z.string().min(1, "Can't be empty"),
  clientEmail: z.email('Invalid email'),
  clientAddress: Address,
  dateIssued: z.date(),
  description: z.string().min(1, "Can't be empty"),
  paymentTerms: z.number(),
  items: Item.array().min(1),
});
