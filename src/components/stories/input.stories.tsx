import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../input';

const meta = {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Input />,
};

export const Disabled: Story = {
  render: () => <Input disabled />,
};

export const Invalid: Story = {
  render: () => <Input aria-invalid />,
};
