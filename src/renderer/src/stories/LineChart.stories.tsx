import { ParentLineChart } from '@renderer/entities/LineChart';
import type { Meta, StoryObj } from '@storybook/react';



const meta: Meta<typeof ParentLineChart> = {
  component: ParentLineChart,
};

export default meta;
type Story = StoryObj<typeof ParentLineChart>;

export const Pair: Story = {
  args: {
   
  },
};