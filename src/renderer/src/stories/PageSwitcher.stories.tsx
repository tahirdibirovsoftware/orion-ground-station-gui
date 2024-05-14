import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { PageSwitcher } from '../features/PageSwitcher';


const meta: Meta<typeof PageSwitcher> = {
  component: PageSwitcher,
  decorators: (Story)=>(
    <BrowserRouter>
    <Story/>
    </BrowserRouter>
  )
};

export default meta;
type Story = StoryObj<typeof PageSwitcher>;

export const Pair: Story = {
  args: {
    title: 'Flight Mode',
    path: 'flight'
  },
};