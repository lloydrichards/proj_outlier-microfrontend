"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  insertSpeakerSchema,
  type InsertSpeakerSchema,
  type Speaker,
} from "@/server/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImgInput } from "@/components/molecule/img_input/img_input";

type SpeakerFormProps = {
  eventId: number;
  edit?: Speaker;
};

export const SpeakerForm: FC<SpeakerFormProps> = ({ eventId, edit }) => {
  const form = useForm<InsertSpeakerSchema>({
    resolver: zodResolver(insertSpeakerSchema),
    defaultValues: edit ?? {
      eventId,
    },
  });
  const router = useRouter();
  const create = api.speaker.add.useMutation({
    onSuccess: () => {
      router.refresh();
      form.reset();
    },
  });
  const update = api.speaker.update.useMutation({
    onSuccess: () => {
      router.refresh();
      form.reset();
    },
  });

  const onSubmit = (values: InsertSpeakerSchema) => {
    console.log(values);
    if (edit) {
      update.mutate({ id: edit.id, ...values });
      return form.reset();
    }
    create.mutate(values);
    return form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <NameInput />
        <PronounsInput />
        <ImgInput />
        <TitleInput />
        <EmailInput />
        <BioTextarea />
        <Button
          variant="plum"
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

const NameInput = () => {
  const form = useFormContext<InsertSpeakerSchema>();

  return (
    <div className="grid grid-cols-2 gap-2">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="John" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Lennon" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const TitleInput = () => {
  const form = useFormContext<InsertSpeakerSchema>();

  return (
    <div className="grid grid-cols-2 gap-2">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                placeholder="director"
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
        name="organization"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Organization</FormLabel>
            <FormControl>
              <Input
                placeholder="Acme Co"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const PronounsInput = () => {
  const form = useFormContext<InsertSpeakerSchema>();

  return (
    <FormField
      control={form.control}
      name="pronouns"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Pronouns</FormLabel>
          <FormControl>
            <Input placeholder="he/him" {...field} value={field.value ?? ""} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
const EmailInput = () => {
  const form = useFormContext<InsertSpeakerSchema>();

  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              placeholder="jl@acme.com"
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

const BioTextarea = () => {
  const form = useFormContext<InsertSpeakerSchema>();

  return (
    <FormField
      control={form.control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea
              placeholder="biography"
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
