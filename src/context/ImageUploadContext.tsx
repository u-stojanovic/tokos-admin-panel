"use client";

import { storage } from "@/lib/configs/firebaseConfig";
import imageCompression from "browser-image-compression";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { createContext, useContext, useState } from "react";

interface ImageUploadContextType {
  images: { url: string; file: File | string }[];
  addImage: (url: string, file: File | string) => void;
  removeImage: (filePath: string) => void;
  uploadImagesToFirebase: () => Promise<string[]>;
}

const ImageUploadContext = createContext<ImageUploadContextType | undefined>(
  undefined,
);

export const ImageUploadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<{ url: string; file: File | string }[]>(
    [],
  );

  const addImage = (url: string, file: File | string) => {
    setImages((prevImages) => [...prevImages, { url, file }]);
  };

  const removeImage = (filePath: string) => {
    setImages((prevImages) => prevImages.filter((img) => img.url !== filePath));
  };

  const uploadImagesToFirebase = async () => {
    const uploadPromises = images.map(async (img) => {
      if (typeof img.file === "string") {
        return img.file;
      } else {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(img.file, options);
        const filePath = `temp-images/${compressedFile.name}`;
        const fileRef = ref(storage, filePath);
        const response = await uploadBytes(fileRef, compressedFile);
        return await getDownloadURL(response.ref);
      }
    });

    return Promise.all(uploadPromises);
  };

  return (
    <ImageUploadContext.Provider
      value={{ images, addImage, removeImage, uploadImagesToFirebase }}
    >
      {children}
    </ImageUploadContext.Provider>
  );
};

export const useImageUpload = () => {
  const context = useContext(ImageUploadContext);
  if (!context) {
    throw new Error(
      "useImageUpload must be used within an ImageUploadProvider",
    );
  }
  return context;
};
