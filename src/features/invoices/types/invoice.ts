export type Status = 'draft' | 'pending' | 'paid';

export type InvoiceListItem = {
  clientName: string;
  id: string;
  paymentDue: Date;
  status: Status;
  total: number;
};
