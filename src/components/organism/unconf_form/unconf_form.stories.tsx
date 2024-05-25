import type { Meta, StoryObj } from "@storybook/react";

import { UnconfForm } from "./unconf_form";
import { type Block } from "@/server/db/schema";

/**
 * An image element with a fallback for representing the user.
 */
const meta = {
  title: "organism/UnconfForm",
  component: UnconfForm,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    block: {
      id: 1,
      start: new Date(),
    } as Block,
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
