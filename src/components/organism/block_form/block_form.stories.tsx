import type { Meta, StoryObj } from "@storybook/react";

import { BlockForm } from "./block_form";
import { Dialog } from "@/components/ui/dialog";

/**
 * An image element with a fallback for representing the user.
 */
const meta = {
  title: "organism/BlockForm",
  component: BlockForm,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    start: new Date(),
  },
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <Dialog>
      <BlockForm {...args} />
    </Dialog>
  ),
} satisfies Meta<typeof BlockForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the BlockForm.
 */
export const Base: Story = {};
