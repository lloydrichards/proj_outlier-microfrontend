"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { insertEventSchema, categoryEnum } from "@/server/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type FC } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  typefaceBody,
  typefaceSubtitle,
  typefaceTitle,
} from "@/components/typeface";
import { CirclePlus, Trash } from "lucide-react";

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

type UnconfSchema = z.infer<typeof unconfSchema>;

type UnconfFormProps = {
  blockId: number;
};

export const UnconfForm: FC<UnconfFormProps> = ({ blockId }) => {
  const [finished, setFinished] = useState(false);
  const form = useForm<UnconfSchema>({
    resolver: zodResolver(unconfSchema),
    defaultValues: {
      event: {
        blockId,
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
        <h2 className={typefaceTitle()}>Organizer</h2>
        <OrganizerInput index={0} />
        <PronounsInput index={0} />
        <EmailInput index={0} />
        <div className="grid w-full gap-2 p-4">
          {fields.map((_, i) => {
            if (i === 0) return null;
            return (
              <div
                key={i}
                className="grid w-full gap-2 rounded border-2 border-input p-2"
              >
                <h3
                  className={typefaceSubtitle(
                    "flex items-center justify-between",
                  )}
                >
                  Co-Organizer #{i}
                  <Button
                    className="text-destructive hover:text-destructive/50"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      return remove(i);
                    }}
                  >
                    <Trash />
                  </Button>
                </h3>
                <OrganizerInput index={i} />
                <PronounsInput index={i} />
                <EmailInput index={i} />
              </div>
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
        <h2 className={typefaceTitle()}>Unconf Event</h2>
        <TitleInput />
        <EventCategorySelect exclude={["KEYNOTE", "DVS"]} />
        <SummaryTextarea />
        <DescriptionTextarea />
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

const OrganizerInput: FC<{ index: number }> = ({ index }) => {
  const form = useFormContext<UnconfSchema>();

  return (
    <div className="grid grid-cols-2 gap-2">
      <FormField
        control={form.control}
        name={`organizers.${index}.firstName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Giorgia"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`organizers.${index}.lastName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Lupi" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const PronounsInput: FC<{ index: number }> = ({ index }) => {
  const form = useFormContext<UnconfSchema>();

  return (
    <FormField
      control={form.control}
      name={`organizers.${index}.pronouns`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Pronouns</FormLabel>

          <Select
            onValueChange={field.onChange}
            defaultValue={field.value ?? ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select preferred pronouns" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="she/her">she/her</SelectItem>
              <SelectItem value="he/him">he/him</SelectItem>
              <SelectItem value="they/them">they/them</SelectItem>
              <SelectItem value="other">other</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
const EmailInput: FC<{ index: number }> = ({ index }) => {
  const form = useFormContext<UnconfSchema>();

  return (
    <FormField
      control={form.control}
      name={`organizers.${index}.email`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              placeholder="data@dvs.com"
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
          <FormDescription>
            Make sure to use the email address you used to register for the
            conference.
          </FormDescription>
        </FormItem>
      )}
    />
  );
};

const TitleInput = () => {
  const form = useFormContext<UnconfSchema>();

  return (
    <FormField
      control={form.control}
      name="event.title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="title" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SummaryTextarea = () => {
  const form = useFormContext<UnconfSchema>();

  return (
    <FormField
      control={form.control}
      name="event.summary"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Summary</FormLabel>
          <FormControl>
            <Textarea
              placeholder="description"
              className="resize-y"
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
          <FormDescription>
            A short summary of your event. This will be displayed in the
            schedule.
          </FormDescription>
        </FormItem>
      )}
    />
  );
};
const DescriptionTextarea = () => {
  const form = useFormContext<UnconfSchema>();

  return (
    <FormField
      control={form.control}
      name="event.description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="description"
              className="h-40 resize-y"
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
          <FormDescription>
            Please provide a detailed description of your event. This will be
            used to evaluate your submission.
          </FormDescription>
        </FormItem>
      )}
    />
  );
};

const EventCategorySelect: FC<{
  exclude?: string[];
}> = ({ exclude }) => {
  const form = useFormContext<UnconfSchema>();
  return (
    <FormField
      control={form.control}
      name="event.category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select category of event" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categoryEnum.enumValues
                .filter((e) => (exclude ? !exclude.includes(e) : true))
                .map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
