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
import { Select } from "@/components/ui/select";
import {
  type Block,
  type InsertBlockSchema,
  insertBlockSchema,
} from "@/server/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";

type BlockFormProps = {
  editBlock?: Block;
};
export const BlockForm: FC<BlockFormProps> = ({ editBlock }) => {
  const form = useForm<InsertBlockSchema>({
    resolver: zodResolver(insertBlockSchema),
    defaultValues: editBlock ?? {},
  });

  const onSubmit = async (values: InsertBlockSchema) => {
    // await api.block.add(values);
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                </Select>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="plum" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
