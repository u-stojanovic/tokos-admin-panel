"use client";

import React from "react";
import { ProductWithRelations } from "@/lib";
import { Label } from "@radix-ui/react-label";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { DeleteImage } from "./deleteImage";

interface EditProductImagesProps {
  product: ProductWithRelations;
}

export const EditProductImages: React.FC<EditProductImagesProps> = ({
  product,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      <Label htmlFor="productImages" className="text-base font-semibold">
        Product Images
      </Label>
      <div className="space-y-4">
        <Swiper
          modules={[Navigation, Thumbs]}
          loop={false}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          className="w-full h-auto rounded-lg shadow-md"
        >
          {product.images.map((image, index) => (
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
              <DeleteImage url={image.imageUrl} />{" "}
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          className="w-full h-auto rounded-lg shadow-md"
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index} className="cursor-pointer relative">
              <Image
                src={image.imageUrl}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
