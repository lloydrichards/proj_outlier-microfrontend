import type { Meta, StoryObj } from "@storybook/react";

import { BlockCard } from "./block_card";
import type { RouterOutput } from "@/trpc/react";

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
type MockBlock = RouterOutput["block"]["getAgenda"][number];

/**
 * The default form of the BlockCard.
 */
export const Announcement: Story = {
  args: {
    block: {
      type: "ANNOUNCEMENT",
      events: [
        {
          title: "Title",
          description: "Description",
        },
      ],
    } as MockBlock,
  },
};

export const Speaker: Story = {
  args: {
    block: {
      type: "SPEAKER",
      events: [
        {
          title: "Title",
          speakers: [
            {
              fullName: "First Last",
            },
          ],
        },
      ],
    } as MockBlock,
  },
};

export const Lightning: Story = {
  args: {
    block: {
      type: "LIGHTNING",
      events: [
        {
          title: "Title",
          speakers: [
            {
              fullName: "First Last",
            },
          ],
        },
      ],
    } as MockBlock,
  },
};

export const Networking: Story = {
  args: {
    block: {
      type: "NETWORKING",
      events: [
        {
          title: "Title",
          description: "Description",
        },
      ],
    } as MockBlock,
  },
};

export const Pause: Story = {
  args: {
    block: {
      type: "PAUSE",
    } as MockBlock,
  },
};

export const Unconf: Story = {
  args: {
    block: {
      type: "UNCONF",
    } as MockBlock,
  },
};
