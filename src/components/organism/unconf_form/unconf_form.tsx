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
import { type FC } from "react";
import { useForm, useFormContext } from "react-hook-form";
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
import { typefaceTitle } from "@/components/typeface";

const unconfSchema = z.object({
  event: z.object({
    blockId: z.number(),
    title: z.string(),
    category: insertEventSchema.shape.category,
    description: z.string(),
  }),
  organizer: z.object({
    firstName: z.string(),
    lastName: z.string(),
    pronouns: z.string(),
    email: z.string().email(),
  }),
});

type UnconfSchema = z.infer<typeof unconfSchema>;

type UnconfFormProps = {
  blockId: number;
};

export const UnconfForm: FC<UnconfFormProps> = ({ blockId }) => {
  const form = useForm<UnconfSchema>({
    resolver: zodResolver(unconfSchema),
    defaultValues: {
      event: { blockId },
    },
  });
  const router = useRouter();
  const create = api.unconf.create.useMutation({
    onSuccess: () => {
      router.refresh();
      form.reset();
    },
  });

  const onSubmit = (values: UnconfSchema) => {
    create.mutate(values);
    return form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <h2 className={typefaceTitle()}>Organizer</h2>
        <OrganizerInput />
        <PronounsInput />
        <EmailInput />
        <Separator className="my-4" />
        <h2 className={typefaceTitle()}>Unconf Event</h2>
        <TitleInput />
        <EventCategorySelect exclude={["KEYNOTE", "DVS"]} />
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

const OrganizerInput = () => {
  const form = useFormContext<UnconfSchema>();

  return (
    <div className="grid grid-cols-2 gap-2">
      <FormField
        control={form.control}
        name="organizer.firstName"
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
        name="organizer.lastName"
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

const PronounsInput = () => {
  const form = useFormContext<UnconfSchema>();

  return (
    <FormField
      control={form.control}
      name="organizer.pronouns"
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
const EmailInput = () => {
  const form = useFormContext<UnconfSchema>();

  return (
    <FormField
      control={form.control}
      name="organizer.email"
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
              className="resize-y"
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
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
