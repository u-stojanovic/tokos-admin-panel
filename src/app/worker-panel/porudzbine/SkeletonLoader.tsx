import { SearchIcon } from "lucide-react";

const SkeletonRow = () => (
  <tr>
    <td className="py-3 px-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </td>
    <td className="py-3 px-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </td>
    <td className="py-3 px-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </td>
    <td className="py-3 px-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </td>
    <td className="py-3 px-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </td>
  </tr>
);

export const SkeletonLoader = () => {
  return (
    <section className="flex flex-col gap-6 mt-6 flex-1 overflow-y-auto p-4 w-full">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Orders</h2>
      <div className="relative w-full mb-4">
        <label className="sr-only">Search</label>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          id="search"
          placeholder="Search orders..."
          className="w-1/2 bg-white dark:bg-gray-800 rounded-md pl-10 pr-4 py-2 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          disabled
        />
      </div>

      {/* Skeleton for Orders with status "Ordered" */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
        <h3 className="flex justify-center text-lg text-purple-600 font-semibold p-2 dark:text-white">
          Primljene Porudzbine
        </h3>
        <div className="max-h-[50vh] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 z-10">
              <tr>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Porudzbina #
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Poručio
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Ukupno
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Status
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Izmena
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Skeleton for Orders with status "Accepted" */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow mt-6">
        <h3 className="flex justify-center text-lg text-blue-600 font-semibold p-2 dark:text-white">
          Prihvaćene Porudzbine
        </h3>
        <div className="max-h-[50vh] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 z-10">
              <tr>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Porudzbina #
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Poručio
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Ukupno
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Status
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Izmena
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
