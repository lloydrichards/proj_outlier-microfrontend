import type { Meta, StoryObj } from "@storybook/react";

import { BlockCard } from "./block_card";
import type { RouterOutput } from "@/trpc/react";

/**
 * An image element with a fallback for representing the user.
 */
const meta = {
  title: "organism/BlockCard",
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
      duration: 30,
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
      duration: 30,
      start: new Date("2021-10-10T10:00:00Z"),
      end: new Date("2021-10-10T10:30:00Z"),
      events: [
        {
          title: "Title",
          description: "Description",
          summary: "Summary",
          category: "CAREER",
          location: "MAIN",
          speakers: [
            {
              speaker: {
                fullName: "First Last",
                firstName: "First",
                pronouns: "they/them",
                lastName: "Last",
              },
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
      duration: 10,
      events: [
        {
          title: "Title",
          speakers: [
            {
              speaker: {
                fullName: "First Last",
                firstName: "First",
                pronouns: "they/them",
                lastName: "Last",
              },
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
      duration: 45,
      events: [
        {
          title: "Title",
          description: "Description",
          category: "CAREER",
          location: "MAIN",
          speakers: [
            {
              speaker: {
                fullName: "First Last",
                firstName: "First",
                pronouns: "they/them",
                lastName: "Last",
              },
            },
          ],
        },
      ],
    } as MockBlock,
  },
};

export const Pause: Story = {
  args: {
    block: {
      type: "PAUSE",
      duration: 45,
    } as MockBlock,
  },
};

export const Unconf: Story = {
  args: {
    block: {
      type: "UNCONF",
      duration: 45,
      events: [
        {
          title: "Title",
          description: "Description",
          category: "CAREER",
          location: "MAIN",
          speakers: [
            {
              speaker: {
                fullName: "First Last",
                firstName: "First",
                pronouns: "they/them",
                lastName: "Last",
              },
            },
          ],
        },
      ],
    } as MockBlock,
  },
};
