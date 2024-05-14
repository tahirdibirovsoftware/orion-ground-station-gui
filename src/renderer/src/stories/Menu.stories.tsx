import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../app/redux';
import { Menu } from '../widgets/Menu/ui/Menu';


export const decorators = [
    (Story:any) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
    (Story:any)=>(
        <Provider store={store}>
            <Story/>
        </Provider>
    )
  ];

const meta: Meta<typeof Menu> = {
  component: Menu,
  decorators
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Pair: Story = {
  args: {
  },
};