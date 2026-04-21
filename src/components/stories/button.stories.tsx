import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button';
import { Spinner } from '../spinner';

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
    disabled: false,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
    disabled: false,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
    disabled: false,
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
  render: (args) => (
    <Button {...args}>
      <Spinner />
      Loading...
    </Button>
  ),
};
