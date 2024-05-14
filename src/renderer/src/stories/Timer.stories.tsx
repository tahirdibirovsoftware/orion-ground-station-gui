import type { Meta, StoryObj } from '@storybook/react';
import { Timer } from '../entities/Timer/ui/Timer';





const meta: Meta<typeof Timer> = {
  component: Timer,
};

export default meta;
type Story = StoryObj<typeof Timer>;

export const Pair: Story = {
  args: {
    size: 10
  },
};