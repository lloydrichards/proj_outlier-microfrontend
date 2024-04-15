import type { Meta, StoryObj } from "@storybook/react";

import { BlockCard } from "./block_card";

/**
 * An image element with a fallback for representing the user.
 */
const meta = {
  title: "molecule/BlockCard",
  component: BlockCard,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BlockCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the BlockCard.
 */
export const Announcement: Story = {
  args: {
    type: "ANNOUNCEMENT",
  },
};

export const Speaker: Story = {
  args: {
    type: "SPEAKER",
  },
};

export const Lightening: Story = {
  args: {
    type: "LIGHTENING",
  },
};

export const Networking: Story = {
  args: {
    type: "NETWORKING",
  },
};

export const Pause: Story = {
  args: {
    type: "PAUSE",
  },
};

export const Unconf: Story = {
  args: {
    type: "UNCONF",
  },
};
