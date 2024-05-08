import type { Meta, StoryObj } from "@storybook/react";

import { EventForm } from "./event_form";
import { Dialog } from "@/components/ui/dialog";

/**
 * An image element with a fallback for representing the user.
 */
const meta = {
  title: "organism/EventForm",
  component: EventForm,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    blockId: 1,
  },
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <Dialog>
      <EventForm {...args} />
    </Dialog>
  ),
} satisfies Meta<typeof EventForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the EventForm.
 */
export const Base: Story = {};
