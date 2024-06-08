import type { Meta, StoryObj } from "@storybook/react";

import { LocaleSwitcher } from "./locale_switcher";

/**
 * An image element with a fallback for representing the user.
 */
const meta = {
  title: "molecule/LocaleSwitcher",
  component: LocaleSwitcher,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof LocaleSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the LocaleSwitcher.
 */
export const Base: Story = {
  args: {},
};
