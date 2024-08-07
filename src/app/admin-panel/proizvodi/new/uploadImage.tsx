"use client";

import { storage } from "@/lib/configs/firebaseConfig";
import imageCompression from "browser-image-compression";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useImageUpload } from "@/context/ImageUploadContext";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UploadNewImage() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { addImage } = useImageUpload();
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const options = {
          maxSizeMB: 0.25,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        const filePath = `temp-images/${compressedFile.name}`;
        const fileRef = ref(storage, filePath);
        const response = await uploadBytes(fileRef, compressedFile);
        const url = await getDownloadURL(response.ref);

        console.log("File uploaded successfully: ", url);

        addImage(url, filePath);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleUrlUpload = () => {
    if (imageUrl) {
      const filePath = `url-images/${encodeURIComponent(imageUrl)}`;
      // Note: For URL-based images, filePath is just a placeholder as the image isn't actually stored in Firebase
      addImage(imageUrl, filePath);
      setImageUrl("");
    } else {
      console.log("No URL provided");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="uploadImage" className="text-base">
        Upload File based Images or with URL
      </Label>
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          type="file"
          name="file"
          onChange={handleFileChange}
        />
        <Button type="button" onClick={() => inputRef.current?.click()}>
          Upload
        </Button>
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL"
        />
        <Button type="button" onClick={handleUrlUpload}>
          Upload from URL
        </Button>
      </div>
    </div>
  );
}
