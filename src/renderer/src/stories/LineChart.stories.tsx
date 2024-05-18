import { LineChart } from '@renderer/entities/LineChart';
import type { Meta, StoryObj } from '@storybook/react';



const meta: Meta<typeof LineChart> = {
  component: LineChart,
};

export default meta;
type Story = StoryObj<typeof LineChart>;

export const Pair: Story = {
  args: {
   
  },
};