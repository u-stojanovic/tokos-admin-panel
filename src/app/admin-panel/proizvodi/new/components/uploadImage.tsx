"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useImageUpload } from "@/context/ImageUploadContext";

export default function UploadNewImage() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { addImage } = useImageUpload();
  const [imageUrl, setImageUrl] = React.useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const fileArray = Array.from(files);
      fileArray.forEach((file) => {
        const url = URL.createObjectURL(file);
        addImage(url, file);
      });
    } else {
      console.log("No files selected");
    }
  };

  // const handleUrlUpload = () => {
  //   if (imageUrl) {
  //     addImage(imageUrl, imageUrl);
  //     setImageUrl("");
  //   } else {
  //     console.log("No URL provided");
  //   }
  // };
  //
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="uploadImage" className="text-base">
        Upload File-based Images or with URL
      </Label>
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          multiple
          type="file"
          name="file"
          onChange={handleFileChange}
        />
        <Button type="button" onClick={() => inputRef.current?.click()}>
          Upload
        </Button>
      </div>
      {/* <div className="flex gap-2"> */}
      {/*   <Input */}
      {/*     type="text" */}
      {/*     value={imageUrl} */}
      {/*     onChange={(e) => setImageUrl(e.target.value)} */}
      {/*     placeholder="Enter image URL" */}
      {/*   /> */}
      {/*   <Button type="button" onClick={handleUrlUpload}> */}
      {/*     Upload from URL */}
      {/*   </Button> */}
      {/* </div> */}
    </div>
  );
}
