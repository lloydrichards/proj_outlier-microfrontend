import type { Decorator, Preview } from "@storybook/react";
import React from "react";
import { cn } from "../src/lib/utils";
import "../src/styles/globals.css";
import { silka } from "../src/styles/font";
import { TRPCReactProvider } from "../src/trpc/react";

export const decorators: Decorator[] = [
  (Story) => {
    return (
      <TRPCReactProvider>
        <main className={cn("font-silka", silka.variable)}>
          <Story />
        </main>
      </TRPCReactProvider>
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
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
