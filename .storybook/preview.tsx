import type { Decorator, Preview } from "@storybook/react";
import React from "react";
import { cn } from "../src/lib/utils";
import "../src/styles/globals.css";
import { silka } from "../src/styles/font";

export const decorators: Decorator[] = [
  (Story) => {
    return (
      <main className={cn("font-silka", silka.variable)}>
        <Story />
      </main>
    );
  },
];

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
