/* eslint-disable react/jsx-no-literals */
import type { Meta, StoryObj } from "@storybook/react";
import { Loader2, Mail } from "lucide-react";

import { Button } from "./button";

/**
 * Displays a button or a component that looks like a button.
 */
const meta = {
  title: "atom/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
  },
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "default",
    size: "default",
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the button, used for primary actions and commands.
 */
export const Default: Story = {};

/**
 * Use the `turquoise` button to reduce emphasis on secondary actions, such as
 * canceling or dismissing a dialog.
 */
export const Turquoise: Story = {
  args: {
    variant: "turquoise",
  },
};

/**
 * Use the `turquoise` button to reduce emphasis on secondary actions, such as
 * canceling or dismissing a dialog.
 */
export const Plum: Story = {
  args: {
    variant: "plum",
  },
};

/**
 * Use the `turquoise` button to reduce emphasis on secondary actions, such as
 * canceling or dismissing a dialog.
 */
export const Mustard: Story = {
  args: {
    variant: "mustard",
  },
};

/**
 * Use the `ghost` button is minimalistic and subtle, for less intrusive
 * actions.
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

/**
 * Use the `link` button to reduce emphasis on tertiary actions, such as
 * hyperlink or navigation, providing a text-only interactive element.
 */
export const Link: Story = {
  args: {
    variant: "link",
  },
};

/**
 * Add the `disabled` prop to a button to prevent interactions and add a
 * loading indicator, such as a spinner, to signify an in-progress action.
 */
export const Loading: Story = {
  render: (args) => (
    <Button {...args}>
      <Loader2 className="mr-2 size-4 animate-spin" />
      Button
    </Button>
  ),
  args: {
    ...Plum.args,
    disabled: true,
  },
};

/**
 * Add an icon element to a button to enhance visual communication and
 * providing additional context for the action.
 */
export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Mail className="mr-2 size-4" /> Login with Email Button
    </Button>
  ),
  args: {
    ...Plum.args,
  },
};

/**
 * Use the `sm` size for a smaller button, suitable for interfaces needing
 * compact elements without sacrificing usability.
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Use the `lg` size for a larger button, offering better visibility and
 * easier interaction for users.
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Use the "icon" size for a button with only an icon.
 */
export const Icon: Story = {
  args: {
    ...Plum.args,
    size: "icon",
    children: <Mail />,
  },
};

/**
 * Add the `disabled` prop to prevent interactions with the button.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
