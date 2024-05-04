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
  editBlock?: Block;
};
export const BlockForm: FC<BlockFormProps> = ({ start, editBlock }) => {
  const form = useForm<InsertBlockSchema>({
    resolver: zodResolver(insertBlockSchema),
    defaultValues: editBlock ?? {
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
    console.log(values);
    if (editBlock) {
      updateBlock.mutate({ id: editBlock.id, ...values });
      return form.reset();
    }
    createBlock.mutate(values);
    return form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BlockLengthSlider />
        <BlockTypeSelect />
        <Button
          variant="plum"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
