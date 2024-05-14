import type { Meta, StoryObj } from '@storybook/react';
import { Terminal } from '../widgets/Terminal';




const meta: Meta<typeof Terminal> = {
  component: Terminal,
};

export default meta;
type Story = StoryObj<typeof Terminal>;

export const Pair: Story = {
  args: {
   
  },
};