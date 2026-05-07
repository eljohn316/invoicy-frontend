export type Status = 'draft' | 'pending' | 'paid';

export type InvoiceListItem = {
  clientName: string;
  id: string;
  paymentDue: Date;
  status: Status;
  total: number;
};

export type InvoiceSearchParam = {
  status: string[];
};

type Address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

type Item = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type Invoice = {
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: Status;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  id: string;
  dateIssued: Date;
  createdAt: Date;
  paymentDue: Date;
  total: number;
  poster: {
    id: number;
    profileImage: string;
    firstName: string;
    lastName: string;
    fullName: string;
  };
};

export type InvoiceCreatePayload = Omit<
  Invoice,
  'id' | 'total' | 'createdAt' | 'paymentDue' | 'items' | 'dateIssued' | 'poster'
> & { items: Omit<Item, 'total'>[]; dateIssued: string };

export type InvoiceUpdatePayload = Partial<InvoiceCreatePayload>;
