"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Thumbs } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

interface ProductPageProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductPageProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <Link
        href="/proizvodi"
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <MdArrowBack className="mr-2" />
        Idite nazad na listu proizvoda
      </Link>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <Swiper
            modules={[Navigation, EffectFade, Thumbs]}
            loop
            spaceBetween={10}
            slidesPerView={1}
            navigation
            effect="fade"
            thumbs={{ swiper: thumbsSwiper }}
            className="w-full h-auto"
          >
            {product.images.map((image, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center"
              >
                <Image
                  src={image.imageUrl}
                  alt={`${product.name} image ${index + 1}`}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="object-cover rounded-lg"
                />
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
              <SwiperSlide key={index} className="cursor-pointer">
                <Image
                  src={image.imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-lightMode-text dark:text-darkMode-text">
            {product.name}
          </h1>
          <div className="text-xl text-gray-500 dark:text-darkMode-primary">
            {product.description}
          </div>
          <div className="text-3xl font-bold text-lightMode-text dark:text-darkMode-text">
            ${product.price ? product.price : 20}
          </div>
          <div className="flex space-x-4">
            <Button
              size="lg"
              className="bg-lightMode-primary text-lightMode-text dark:bg-darkMode-primary dark:text-lightMode-text"
            >
              Add to cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-lightMode-primary text-darkMode-primary dark:border-darkMode-primary dark:text-darkMode-primary"
            >
              Buy Now
            </Button>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-lightMode-text dark:text-darkMode-text">
              Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-darkMode-primary">
              {product.category.name}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-lightMode-text dark:text-darkMode-text">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-lg text-gray-600 dark:text-darkMode-primary">
              {product.ingredients.map(({ ingredient }) => (
                <li key={ingredient.id}>
                  {ingredient.name} {ingredient.isAlergen ? "(Allergen)" : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
