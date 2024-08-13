import React from "react";

export default function ListCategoriesSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 bg-gray-300 rounded w-32 animate-pulse"></div>
        <div className="h-10 bg-blue-300 rounded-lg w-40 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-100 transition duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 bg-blue-300 rounded-full animate-pulse"></div>
                <div className="h-6 w-6 bg-red-300 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              {[1, 2].map((subIndex) => (
                <div
                  key={subIndex}
                  className="flex justify-between items-center text-gray-700"
                >
                  <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                  <div className="h-4 w-4 bg-red-300 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
