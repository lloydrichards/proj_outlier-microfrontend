"use client";
import { Form } from "@/components/ui/form";
import {
  type Block,
  type InsertBlockSchema,
  insertBlockSchema,
} from "@/server/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { BlockTypeSelect } from "./block_type_select";
import { BlockLengthSlider } from "./block_length_slider";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/components/molecule/submit_button/submit_button";

type BlockFormProps = {
  start: Date;
  edit?: Block;
};
export const BlockForm: FC<BlockFormProps> = ({ start, edit }) => {
  const form = useForm<InsertBlockSchema>({
    resolver: zodResolver(insertBlockSchema),
    defaultValues: edit ?? {
      start,
    },
  });
  const router = useRouter();
  const createBlock = api.block.add.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const updateBlock = api.block.update.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const onSubmit = (values: InsertBlockSchema) => {
    if (edit) {
      updateBlock.mutate({ id: edit.id, ...values });
      return form.reset();
    }
    createBlock.mutate(values);
    return form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <BlockLengthSlider />
        <BlockTypeSelect />
        <SubmitButton />
      </form>
    </Form>
  );
};
