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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Forms.Speaker.Name");
  return (
    <div className="grid grid-cols-2 gap-2">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("first_label")}</FormLabel>
            <FormControl>
              <Input placeholder={t("first_placeholder")} {...field} />
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
            <FormLabel>{t("last_label")}</FormLabel>
            <FormControl>
              <Input placeholder={t("last_placeholder")} {...field} />
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
  const t = useTranslations("Forms.Speaker.Title");

  return (
    <div className="grid grid-cols-2 gap-2">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("title_label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("title_placeholder")}
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
            <FormLabel>{t("organization_label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("organization_placeholder")}
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
  const t = useTranslations("Forms.Speaker.Pronouns");

  return (
    <FormField
      control={form.control}
      name="pronouns"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("label")}</FormLabel>
          <FormControl>
            <Input
              placeholder={t("placeholder")}
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
const EmailInput = () => {
  const form = useFormContext<InsertSpeakerSchema>();
  const t = useTranslations("Forms.Speaker.Email");

  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("label")}</FormLabel>
          <FormControl>
            <Input
              placeholder={t("placeholder")}
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
  const t = useTranslations("Forms.Speaker.Bio");

  return (
    <FormField
      control={form.control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("label")}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={t("placeholder")}
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
