"use client";

import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { useCreateNewCategory } from "@/lib/hooks/category/useCreateCategory";

interface Props {
  categoryId: number;
}

const categorySchema = z.object({
  categoryName: z
    .string()
    .min(1, "Category name is required")
    .max(50, "Category name must be less than 50 characters"),
});

export type CategoryFormInputs = z.infer<typeof categorySchema>;

export function TriggerModalNewSubCategory({ categoryId }: Props) {
  const methods = useForm<CategoryFormInputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName: "",
    },
  });

  const { toast } = useToast();

  const { mutate: createNewSubCategory, isPending } =
    useCreateNewCategory(categoryId);

  const onSubmit: SubmitHandler<CategoryFormInputs> = (data) => {
    createNewSubCategory(data, {
      onSuccess: () => {
        methods.reset();
        toast({
          title: "New SubCategory created",
          description: "Your changes have been saved.",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to create subcategory",
        });
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-blue-500 hover:text-blue-600 transition duration-300"
          >
            <Plus size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new SubCategory</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoryName" className="text-right">
                  Name
                </Label>
                <Input
                  id="categoryName"
                  {...methods.register("categoryName")}
                  placeholder="Enter name of the subcategory"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
