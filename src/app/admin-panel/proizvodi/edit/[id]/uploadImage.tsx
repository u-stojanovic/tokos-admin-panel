"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";

import imageCompression from "browser-image-compression";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/configs/firebaseConfig";

import React from "react";
import { Product } from "@/lib";
import { Navigation, EffectFade, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";

interface ProductImagesProps {
  product: Product;
}

export default function ProductImages({ product }: ProductImagesProps) {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = inputRef.current?.files?.[0];

    if (file) {
      try {
        const options = {
          maxSizeMB: 0.25,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        const fileRef = ref(storage, `images/${compressedFile.name}`);
        await uploadBytes(fileRef, compressedFile);
        console.log("File uploaded successfully");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="space-y-6">
      <Swiper
        modules={[Navigation, EffectFade, Thumbs]}
        loop={false}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        effect="fade"
        thumbs={{ swiper: thumbsSwiper }}
        className="w-full h-auto"
      >
        {product &&
          product.images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center relative"
            >
              <Image
                src={image.imageUrl}
                alt={`${product.name} image ${index + 1}`}
                loading="lazy"
                width={1000}
                height={1000}
                className="object-cover rounded-lg"
              />
              <button
                onClick={() => console.log(`Delete image ${index}`)}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white"
              >
                <FaTrash />
              </button>
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        className="w-full h-auto"
      >
        {product.images.map((image, index) => (
          <SwiperSlide key={index} className="cursor-pointer relative">
            <Image
              src={image.imageUrl}
              alt={`Thumbnail ${index + 1}`}
              width={250}
              height={250}
              className="object-cover rounded-lg"
            />
            <button
              onClick={() => console.log(`Delete image ${index}`)}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white"
            >
              <FaTrash />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        <form onSubmit={handleUpload}>
          <div className="flex gap-2">
            <Input ref={inputRef} type="file" name="file" />
            <Button type="submit">Upload</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
