import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggler } from '../features/ThemeToggler';


const meta: Meta<typeof ThemeToggler> = {
  component: ThemeToggler,
};

export default meta;
type Story = StoryObj<typeof ThemeToggler>;

export const Pair: Story = {
  args: {
    size: 10
  },
};