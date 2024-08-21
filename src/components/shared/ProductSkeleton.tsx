export default function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-64 w-full rounded-lg"></div>
      <div className="space-y-3 mt-2">
        <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>
    </div>
  );
}
