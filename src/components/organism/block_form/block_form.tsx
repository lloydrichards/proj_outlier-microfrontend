"use client";
import { Button } from "@/components/ui/button";
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
      form.reset();
    },
  });
  const updateBlock = api.block.update.useMutation({
    onSuccess: () => {
      router.refresh();
      form.reset();
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
