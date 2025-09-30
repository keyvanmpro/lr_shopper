export default function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 aspect-square mb-3"></div>
      <div className="space-y-2">
        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
        <div className="bg-gray-300 h-3 rounded w-1/2"></div>
        <div className="bg-gray-300 h-4 rounded w-1/3"></div>
      </div>
    </div>
  );
}