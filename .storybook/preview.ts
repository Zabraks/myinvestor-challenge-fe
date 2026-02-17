import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import {
  fundListHandlers,
  fundDetailHandlers,
  buyFundHandlers,
  sellFundHandlers,
  transferFundHandlers,
  portfolioHandlers,
} from '../src/mocks/handlers';
import '../src/styles/globals.css';

initialize();

const preview: Preview = {
  parameters: {
    layout: 'centered',
    msw: {
      handlers: [
        ...fundListHandlers,
        ...fundDetailHandlers,
        ...buyFundHandlers,
        ...sellFundHandlers,
        ...transferFundHandlers,
        ...portfolioHandlers,
      ],
    },
  },
  loaders: [mswLoader],
};

export default preview;
