import { Meta, StoryObj } from '@storybook/react';

import { App } from '~/App';

export default {
  title: 'Example/App',
  component: App,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<typeof App>;

export const Default: StoryObj = {
  name: '通常表示',
};
