import React from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useImageUpload } from "@/context/ImageUploadContext";
import { Label } from "@/components/ui/label";

// NOTE: Type guard to check if the image is of the first type
const isUrlImage = (
  image:
    | { url: string; file: File | string }
    | { id: number; imageUrl: string; productId: number },
): image is { url: string; file: File | string } => {
  return (image as { url: string; file: File | string }).url !== undefined;
};

export const UploadedImages: React.FC = () => {
  const { images, removeImage } = useImageUpload();

  const handleImageDelete = (url: string) => {
    removeImage(url);
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="uploadedImages" className="text-base">
        Uploaded Images
      </Label>
      <div className="grid grid-cols-2 gap-2">
        {images.map((img, index) => {
          const imageUrl = isUrlImage(img) ? img.url : img.imageUrl;
          return (
            <div key={index} className="relative">
              <Image
                width={100}
                height={100}
                src={imageUrl}
                alt={`Uploaded ${index}`}
                className="w-full h-auto"
              />
              <Button
                size="icon"
                type="button"
                className="absolute top-0 right-0 bg-red-600 text-white p-1"
                onClick={() => handleImageDelete(imageUrl)}
              >
                <FaTrash />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
