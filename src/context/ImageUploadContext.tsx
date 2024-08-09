"use client";

import { deleteImageFromDB } from "@/lib/actions/imageActions";
import { storage } from "@/lib/configs/firebaseConfig";
import imageCompression from "browser-image-compression";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { createContext, useContext, useState } from "react";
import { deleteObject } from "firebase/storage";

type UploadedImage =
  | { url: string; file: File | string }
  | { id: number; imageUrl: string; productId: number };

interface ImageUploadContextType {
  images: UploadedImage[];
  addImage: (url: string, file: File | string) => void;
  removeImage: (filePath: string) => void;
  deleteImage: (url: string) => Promise<void>;
  uploadImagesToFirebase: () => Promise<string[]>;
}

const ImageUploadContext = createContext<ImageUploadContextType | undefined>(
  undefined,
);

export const ImageUploadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const addImage = (url: string, file: File | string) => {
    setImages((prevImages) => [...prevImages, { url, file }]);
  };

  const removeImage = (filePath: string) => {
    setImages((prevImages) =>
      prevImages.filter((img) =>
        "url" in img ? img.url !== filePath : img.imageUrl !== filePath,
      ),
    );
  };

  const deleteImage = async (url: string): Promise<void> => {
    try {
      await deleteImageFromDB(url);

      const imageRef = ref(storage, url);
      await deleteObject(imageRef);

      removeImage(url);
    } catch (error) {
      console.error("Failed to delete the image:", error);
      throw error;
    }
  };

  const uploadImagesToFirebase = async () => {
    const uploadPromises = images.map(async (img) => {
      if ("file" in img && typeof img.file !== "string") {
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
      } else {
        return "url" in img ? img.url : img.imageUrl;
      }
    });

    return Promise.all(uploadPromises);
  };

  return (
    <ImageUploadContext.Provider
      value={{
        images,
        addImage,
        removeImage,
        deleteImage,
        uploadImagesToFirebase,
      }}
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
