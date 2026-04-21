import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  InvoiceListItem,
  InvoiceListItemSkeleton,
} from '@/features/invoices/components/invoice-list-item';

const meta = {
  title: 'InvoiceListItem',
  component: InvoiceListItem,
  subcomponents: { InvoiceListItemSkeleton },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-w-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InvoiceListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Draft: Story = {
  args: {
    invoice: {
      clientName: 'Jensen Huang',
      id: '4e7l7xsxd2s5u4l0inm5h',
      paymentDue: new Date('2021-9-20'),
      status: 'draft',
      total: 1800.9,
    },
  },
};

export const Pending: Story = {
  args: {
    invoice: {
      clientName: 'Jensen Huang',
      id: '4e7l7xsxd2s5u4l0inm5h',
      paymentDue: new Date('2021-9-20'),
      status: 'pending',
      total: 1800.9,
    },
  },
};

export const Paid: Story = {
  args: {
    invoice: {
      clientName: 'Jensen Huang',
      id: '4e7l7xsxd2s5u4l0inm5h',
      paymentDue: new Date('2021-9-20'),
      status: 'paid',
      total: 1800.9,
    },
  },
};

type SkeletonStory = StoryObj<{ component: typeof InvoiceListItemSkeleton }>;

export const Skeleton: SkeletonStory = {
  render: () => <InvoiceListItemSkeleton />,
};
