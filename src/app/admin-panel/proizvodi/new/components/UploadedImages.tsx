import React from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useImageUpload } from "@/context/ImageUploadContext";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/lib/configs/firebaseConfig";
import { Label } from "@/components/ui/label";

export const UploadedImages: React.FC = () => {
  const { images, removeImage } = useImageUpload();

  const handleImageDelete = (filePath: string) => {
    if (filePath.startsWith("temp-images")) {
      const fileRef = ref(storage, filePath);
      deleteObject(fileRef)
        .then(() => {
          console.log(`Deleted ${filePath} successfully`);
          removeImage(filePath);
        })
        .catch((error) => {
          console.log(`Failed to delete ${filePath}`, error);
        });
    } else {
      removeImage(filePath);
    }
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
              className="absolute top-0 right-0 bg-red-600 text-white p-1"
              onClick={() => handleImageDelete(img.filePath)}
            >
              <FaTrash />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
