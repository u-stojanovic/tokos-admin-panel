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
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-200 dark:bg-gray-700 p-4">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search orders..."
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-md px-4 py-2 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled
            />
          </div>
        </div>
        {/* Skeleton Loader for the Table */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
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
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
