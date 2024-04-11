import type { Meta, StoryObj } from "@storybook/react";
import {
  typefaceBody,
  typefaceMeta,
  typefaceSubtitle,
  typefaceTitle,
} from "./typeface";
import { cn } from "@/lib/utils";

const meta: Meta<{
  typeface: Record<string, string>;
  children: string;
}> = {
  title: "design/Typeface",
  argTypes: {},
  args: {
    children: "The quick brown fox jumps over the lazy dog",
    typeface: {
      Title: typefaceTitle(),
      Subtitle: typefaceSubtitle(),
      Body: typefaceBody(),
      Meta: typefaceMeta(),
    },
  },
  render: (args) => (
    <div className="max-w-none">
      <table>
        <thead>
          <tr>
            <th className="min-w-36">Name</th>
            <th className="min-w-36">Classes</th>
            <th>Typeface</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(args.typeface).map(([name, className]) => (
            <tr key={name} className="border-b">
              <td className={typefaceBody("")}>{name}</td>
              <td className={typefaceBody("whitespace-pre-wrap")}>
                {className.replaceAll(" ", "\n")}
              </td>
              <td className="w-full p-4">
                <p className={cn("line-clamp-1", className)}>{args.children}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  parameters: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Core: Story = {};
