import type { Meta, StoryObj } from "@storybook/react";

import { BlockCard } from "./block_card";
import type { Block, Event, Speaker as TSpeaker } from "@/server/db/schema";

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
type MockBlock = Block & { events: Array<Event & { speakers: TSpeaker[] }> };

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
              first_name: "First",
              last_name: "Last",
            },
          ],
        },
      ],
    } as MockBlock,
  },
};

export const Lightening: Story = {
  args: {
    block: {
      type: "LIGHTENING",
      events: [
        {
          title: "Title",
          speakers: [
            {
              first_name: "First",
              last_name: "Last",
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
