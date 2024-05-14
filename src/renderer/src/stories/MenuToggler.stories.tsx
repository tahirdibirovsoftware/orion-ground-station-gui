import type { Meta, StoryObj } from '@storybook/react';
import { MenuToggler } from '../features/MenuToggler';
import { Provider } from 'react-redux';
import store from '../app/redux';


const meta: Meta<typeof MenuToggler> = {
  component: MenuToggler,
  decorators: (Story)=>(
    <Provider store={store}>
      <Story/>
    </Provider>
  )
};

export default meta;
type Story = StoryObj<typeof MenuToggler>;

export const Pair: Story = {
  args: {
  },
};