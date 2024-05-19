import { Button } from "@/components/atom/button";
import { DialogClose } from "@/components/atom/dialog";
import { type FC } from "react";
import { useFormState } from "react-hook-form";

export const SubmitButton: FC = () => {
  const form = useFormState();
  return (
    <DialogClose asChild>
      <Button
        variant="plum"
        disabled={form.isSubmitting}
        className="mt-2"
        type="submit"
      >
        {form.isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </DialogClose>
  );
};
