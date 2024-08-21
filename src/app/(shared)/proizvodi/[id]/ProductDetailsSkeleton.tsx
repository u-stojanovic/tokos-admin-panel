"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";

export default function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="flex items-center mb-4">
        <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          {/* Main Image Swiper Skeleton */}
          <Swiper
            modules={[Navigation, EffectFade, Thumbs]}
            loop={false}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            effect="fade"
            className="w-full h-auto"
          >
            <SwiperSlide className="flex justify-center items-center">
              <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"></div>
            </SwiperSlide>
          </Swiper>

          {/* Thumbnail Swiper Skeleton */}
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            className="w-full h-auto"
          >
            {[...Array(4)].map((_, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <div className="w-full h-24 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="space-y-6">
          {/* Title Skeleton */}
          <div className="w-3/4 h-8 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>

          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="w-full h-6 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            <div className="w-full h-6 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            <div className="w-3/4 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          </div>

          {/* Price Skeleton */}
          <div className="w-1/4 h-8 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>

          {/* Category Skeleton */}
          <div className="space-y-2">
            <div className="w-1/2 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            <div className="w-1/3 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          </div>

          {/* Ingredients Skeleton */}
          <div className="space-y-2">
            <div className="w-1/2 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            <ul className="space-y-2">
              {[...Array(3)].map((_, index) => (
                <li
                  key={index}
                  className="w-full h-6 bg-gray-300 dark:bg-gray-700 animate-pulse"
                ></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
