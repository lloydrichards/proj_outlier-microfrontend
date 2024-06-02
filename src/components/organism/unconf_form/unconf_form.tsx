"use client";
import {
  typefaceBody,
  typefaceSubtitle,
  typefaceTitle,
} from "@/components/typeface";
import { Button } from "@/components/atom/button";
import { Form } from "@/components/atom/form";
import { Separator } from "@/components/atom/separator";
import { type Block, insertEventSchema } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FC, type MouseEventHandler } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { AdditionalInfoTextarea } from "./additional_info_textarea";
import { DescriptionTextarea } from "./description_textarea";
import { EmailInput } from "./email_input";
import { EventCategorySelect } from "./event_category_select";
import { OrganizerInput } from "./organizer_input";
import { PronounsInput } from "./pronouns_input";
import { TitleInput } from "./title_input";
import { useFormatter } from "next-intl";

const unconfSchema = z.object({
  event: z.object({
    blockId: z.number(),
    title: z.string(),
    category: insertEventSchema.shape.category,
    summary: z.string(),
    description: z.string(),
  }),
  organizers: z.array(
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      pronouns: z.string(),
      email: z.string().email(),
    }),
  ),
});

export type UnconfSchema = z.infer<typeof unconfSchema>;

type UnconfFormProps = {
  block: Block;
};

export const UnconfForm: FC<UnconfFormProps> = ({ block }) => {
  const [finished, setFinished] = useState(false);
  const format = useFormatter();
  const form = useForm<UnconfSchema>({
    resolver: zodResolver(unconfSchema),
    defaultValues: {
      event: {
        blockId: block.id,
        description:
          "1. Best way to reach you during the conference\n\n2. Session Type (Talk, Panel, Discussion, Q&A/AMA, Hands On, Fun/Misc)\n\n3. Supplies or equipment needed (e.g., projector)\n\n",
      },
    },
  });
  const router = useRouter();
  const create = api.unconf.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setFinished(true);
    },
  });

  const onSubmit = (values: UnconfSchema) => {
    create.mutate(values);
    return form.reset();
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "organizers",
  });

  if (finished) {
    return (
      <div className="grid gap-2">
        <h2 className={typefaceTitle("text-center")}>
          Thank you for your submission!
        </h2>
        <p className={typefaceBody("text-balance text-center")}>
          Your event has been submitted and is pending approval. Check the
          schedule to see if your event has been accepted.
        </p>
      </div>
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <h1 className={typefaceSubtitle("text-right opacity-30")}>
          Unconf Submission [
          {format.dateTime(block.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}{" "}
          -{" "}
          {format.dateTime(block.start, {
            hour: "numeric",
            minute: "numeric",
          })}
          ]
        </h1>
        <h2 className={typefaceTitle()}>Organizer</h2>
        <OrganizerInput index={0} />
        <PronounsInput index={0} />
        <EmailInput index={0} />
        <div className="grid w-full gap-2 p-4">
          {fields.map((_, i) => {
            if (i === 0) return null;
            return (
              <CoOrganizerSection
                key={i}
                index={i}
                onRemove={(e) => {
                  e.preventDefault();
                  return remove(i);
                }}
              />
            );
          })}
          <Button
            onClick={(e) => {
              e.preventDefault();
              return append({
                firstName: "",
                lastName: "",
                pronouns: "",
                email: "",
              });
            }}
          >
            <CirclePlus /> Add Co-Speaker
          </Button>
        </div>
        <Separator className="my-4" />
        <h2 className={typefaceTitle()}>Event</h2>
        <TitleInput />
        <EventCategorySelect exclude={["KEYNOTE", "DVS"]} />
        <DescriptionTextarea />
        <AdditionalInfoTextarea />
        <Button
          variant="mustard"
          disabled={form.formState.isSubmitting}
          className="mt-2"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

const CoOrganizerSection: FC<{
  index: number;
  onRemove: MouseEventHandler;
}> = ({ index, onRemove }) => {
  return (
    <div className="grid w-full gap-2 rounded border-2 border-input p-2">
      <h3 className={typefaceSubtitle("flex items-center justify-between")}>
        Co-Organizer #{index}
        <Button
          className="text-destructive hover:text-destructive/50"
          size="icon"
          onClick={onRemove}
        >
          <Trash />
        </Button>
      </h3>
      <OrganizerInput index={index} />
      <PronounsInput index={index} />
      <EmailInput index={index} />
    </div>
  );
};
