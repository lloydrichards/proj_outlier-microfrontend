"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atom/form";
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
import { Input } from "@/components/atom/input";
import { Textarea } from "@/components/atom/textarea";
import { ImgInput } from "@/components/molecule/img_input/img_input";
import { SubmitButton } from "@/components/molecule/submit_button/submit_button";

type SpeakerFormProps = {
  eventId: number;
  edit?: Speaker;
};

export const SpeakerForm: FC<SpeakerFormProps> = ({ eventId, edit }) => {
  const form = useForm<InsertSpeakerSchema>({
    resolver: zodResolver(insertSpeakerSchema),
    defaultValues: edit,
  });
  const router = useRouter();
  const create = api.speaker.add.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const update = api.speaker.update.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const onSubmit = (values: InsertSpeakerSchema) => {
    console.log(values);
    if (edit) {
      update.mutate({ id: edit.id, ...values });
      return form.reset();
    }
    create.mutate({
      speaker: values,
      eventId,
    });
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
        <SubmitButton />
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
