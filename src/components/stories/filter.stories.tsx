import type { Meta, StoryObj } from '@storybook/react-vite';
import { Filter } from '../filter';

const meta = {
  title: 'Filter',
  component: Filter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Filter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
