import type { Meta, StoryObj } from '@storybook/react';

import {Clock} from './Clock';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Clock> = {
  component: Clock,
};

export default meta;
type Story = StoryObj<typeof Clock>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};