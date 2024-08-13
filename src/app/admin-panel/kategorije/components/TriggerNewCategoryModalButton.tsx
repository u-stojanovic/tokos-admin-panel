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

import { useCreateNewCategory } from "@/lib/hooks/category/useCreateCategory";

const categorySchema = z.object({
  categoryName: z
    .string()
    .min(1, "Category name is required")
    .max(50, "Category name must be less than 50 characters"),
});

export type CategoryFormInputs = z.infer<typeof categorySchema>;

export function TriggerModalNewCategory() {
  const methods = useForm<CategoryFormInputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName: "",
    },
  });

  const { mutate: createNewCategory, isPending } = useCreateNewCategory();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<CategoryFormInputs> = (data) => {
    createNewCategory(data, {
      onSuccess: () => {
        toast({
          title: "New Category created",
          description: "Your changes have been saved.",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to create category",
        });
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
            + New Category
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new Category</DialogTitle>
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
                  placeholder="Enter name of the category"
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
