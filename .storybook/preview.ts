import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { handlers } from '../src/mocks/fundsList.handlers';
import '../src/styles/globals.css';

initialize();

const preview: Preview = {
  parameters: {
    layout: 'centered',
    msw: {
      handlers,
    },
  },
  loaders: [mswLoader],
};

export default preview;
