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
  type Event,
  type InsertEventSchema,
  insertEventSchema,
} from "@/server/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { EventCategorySelect } from "./event_category_select";
import { Input } from "@/components/atom/input";
import { Textarea } from "@/components/atom/textarea";
import { EventLocationSelect } from "./event_location_select";
import { ImgInput } from "../../molecule/img_input/img_input";
import { SubmitButton } from "@/components/molecule/submit_button/submit_button";
import { useTranslations } from "next-intl";

type EventFormProps = {
  blockId: number;
  edit?: Event;
};

export const EventForm: FC<EventFormProps> = ({ blockId, edit }) => {
  const form = useForm<InsertEventSchema>({
    resolver: zodResolver(insertEventSchema),
    defaultValues: edit ?? {
      blockId,
    },
  });
  const router = useRouter();
  const create = api.event.add.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const update = api.event.update.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const onSubmit = (values: InsertEventSchema) => {
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
        <TitleInput />
        <SummaryTextarea />
        <DescriptionTextarea />
        <ImgInput />
        <EventLocationSelect />
        <EventCategorySelect />
        <LinkInput />
        <SubmitButton />
      </form>
    </Form>
  );
};

const TitleInput = () => {
  const form = useFormContext<InsertEventSchema>();
  const t = useTranslations("Forms.Event.Title");
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("label")}</FormLabel>
          <FormControl>
            <Input placeholder={t("placeholder")} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SummaryTextarea = () => {
  const form = useFormContext<InsertEventSchema>();
  const t = useTranslations("Forms.Event.Summary");

  return (
    <FormField
      control={form.control}
      name="summary"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("label")}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={t("helper")}
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

const DescriptionTextarea = () => {
  const form = useFormContext<InsertEventSchema>();
  const t = useTranslations("Forms.Event.Description");

  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("label")}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={t("helper")}
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

const LinkInput = () => {
  const form = useFormContext<InsertEventSchema>();
  const t = useTranslations("Forms.Event.Link");

  return (
    <div className="grid grid-cols-3 gap-2">
      <FormField
        control={form.control}
        name="linkLabel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("link_label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("link_placeholder")}
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
        name="linkUrl"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>{t("url_label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("url_placeholder")}
                type="url"
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
