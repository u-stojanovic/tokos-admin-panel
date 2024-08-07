"use client";

import React, { createContext, useContext, useState } from "react";

interface ImageUploadContextType {
  images: { url: string; filePath: string }[];
  addImage: (url: string, filePath: string) => void;
  removeImage: (filePath: string) => void;
}

const ImageUploadContext = createContext<ImageUploadContextType | undefined>(
  undefined,
);

export const ImageUploadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<{ url: string; filePath: string }[]>([]);

  const addImage = (url: string, filePath: string) => {
    setImages((prevImages) => [...prevImages, { url, filePath }]);
  };

  const removeImage = (filePath: string) => {
    setImages((prevImages) =>
      prevImages.filter((img) => img.filePath !== filePath),
    );
  };

  return (
    <ImageUploadContext.Provider value={{ images, addImage, removeImage }}>
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
