import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  core: {
    builder: '@storybook/builder-vite'
  },
  async viteFinal(config, { configType }) {
    // ... any existing Vite config modifications 
    config.resolve!.alias = {
      '@renderer': path.resolve(__dirname, '../src/renderer'), // Ensure alignment with Vite config,
      process: 'process/browser',
    };
    config.define = config.define || {};
    config.define['process.env'] = {}; 

    return config;
  },
}
export default config
