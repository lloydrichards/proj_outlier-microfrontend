import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "./label";

/**
 * Renders an accessible label associated with controls.
 */
const meta = {
  title: "atom/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
    },
  },
  args: {
    children: "Your email address",
    htmlFor: "email",
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof Label>;

/**
 * The default form of the label.
 */
export const Default: Story = {};
