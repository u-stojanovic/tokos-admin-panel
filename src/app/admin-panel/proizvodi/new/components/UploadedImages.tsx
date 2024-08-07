import React from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useImageUpload } from "@/context/ImageUploadContext";
import { Label } from "@/components/ui/label";

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
        {images.map((img, index) => (
          <div key={index} className="relative">
            <Image
              width={100}
              height={100}
              src={img.url}
              alt={`Uploaded ${index}`}
              className="w-full h-auto"
            />
            <Button
              size="icon"
              type="button"
              className="absolute top-0 right-0 bg-red-600 text-white p-1"
              onClick={() => handleImageDelete(img.url)}
            >
              <FaTrash />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
