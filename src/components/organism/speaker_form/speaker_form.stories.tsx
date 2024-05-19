import type { Meta, StoryObj } from "@storybook/react";

import { SpeakerForm } from "./speaker_form";
import { Dialog } from "@/components/atom/dialog";

/**
 * An image element with a fallback for representing the user.
 */
const meta = {
  title: "organism/SpeakerForm",
  component: SpeakerForm,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    eventId: 1,
  },
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <Dialog>
      <SpeakerForm {...args} />
    </Dialog>
  ),
} satisfies Meta<typeof SpeakerForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the SpeakerForm.
 */
export const Base: Story = {};
