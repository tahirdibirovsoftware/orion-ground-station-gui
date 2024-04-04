import type { Meta, StoryObj } from '@storybook/react';
import Graph from './Graph';


//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Graph> = {
  component: Graph,
};

export default meta;
type Story = StoryObj<typeof Graph>;

export const FirstStory: Story = {
  args: {
    XParameter: 'Temperature',
    YParameter: 'Time'
  },
};