"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useImageUpload } from "@/context/ImageUploadContext";
import { FaTrash } from "react-icons/fa";

interface DeleteImageProps {
  id: number;
  url: string;
  onDelete: (url: string) => void;
}

export function DeleteImage({ id, url, onDelete }: DeleteImageProps) {
  const queryClient = useQueryClient();
  const { deleteImage } = useImageUpload();

  const mutation = useMutation({
    mutationFn: () => deleteImage(url),
    onSuccess: () => {
      console.log("Image deletion successful, invalidating queries...");
      onDelete(url);
      queryClient.invalidateQueries({
        queryKey: ["getProduct", id],
      });
    },
    onError: (error) => {
      console.error("Failed to delete the image:", error);
      queryClient.invalidateQueries({
        queryKey: ["getProduct", id],
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          type="button"
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition ease-in-out"
        >
          <FaTrash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the image
            from the product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
