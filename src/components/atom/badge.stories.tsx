import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./badge";

/**
 * Displays a badge or a component that looks like a badge.
 */
const meta = {
  title: "atom/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
  },
  args: {
    children: "Badge",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the badge.
 */
export const Default: Story = {};

/**
 * Use the `turquoise` badge to call for less urgent information, blending
 * into the interface while still signaling minor updates or statuses.
 */
export const Turquoise: Story = {
  args: {
    variant: "turquoise",
  },
};

/**
 * Use the `plum` badge to  indicate errors, alerts, or the need for
 * immediate attention.
 */
export const Plum: Story = {
  args: {
    variant: "plum",
  },
};

/**
 * Use the `mustard` badge to  indicate errors, alerts, or the need for
 * immediate attention.
 */
export const Mustard: Story = {
  args: {
    variant: "mustard",
  },
};
