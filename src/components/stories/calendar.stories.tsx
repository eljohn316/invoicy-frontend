import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Calendar } from '../calendar';

const meta = {
  title: 'Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    return <Calendar mode="single" selected={date} onSelect={setDate} className="min-w-96" />;
  },
};
