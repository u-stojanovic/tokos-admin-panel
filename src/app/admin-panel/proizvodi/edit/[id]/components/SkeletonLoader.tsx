import React from "react";

export default function EditProductSkeletonLoader() {
  return (
    <div className="grid gap-4 max-w-4xl mx-auto py-6 animate-pulse">
      <div className="flex items-center justify-center mb-4 h-10 bg-gray-300 rounded"></div>

      <div className="font-bold text-2xl sm:text-3xl text-center h-8 bg-gray-300 rounded"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className="h-10 bg-gray-300 rounded"></div>
          <div className="h-24 bg-gray-300 rounded"></div>

          <div className="grid gap-2">
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>

          <div className="h-10 bg-gray-300 rounded"></div>

          <div className="aspect-w-1 aspect-h-1 bg-gray-300 rounded"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
          <div className="h-12 bg-gray-300 rounded"></div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="h-10 bg-gray-300 rounded"></div>
          <div className="h-48 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
