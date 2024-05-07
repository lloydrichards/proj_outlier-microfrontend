import type { Meta, StoryObj } from "@storybook/react";

import { UnconfForm } from "./unconf_form";

/**
 * An image element with a fallback for representing the user.
 */
const meta = {
  title: "organism/UnconfForm",
  component: UnconfForm,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    blockId: 1,
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof UnconfForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the UnconfForm.
 */
export const Base: Story = {};
