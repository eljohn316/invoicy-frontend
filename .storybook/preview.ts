import type { Preview } from '@storybook/react-vite';
import { withTanStackRouter } from 'storybook-addon-tanstack-router';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const decorators = [withTanStackRouter];
