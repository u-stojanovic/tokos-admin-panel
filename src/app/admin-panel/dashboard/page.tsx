export default function Dashboard() {
  return (
    <div className="sm:grid sm:grid-cols-1 flex flex-col gap-6 mt-6 flex-1 overflow-y-auto p-4">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2 dark:text-white">
              Total Users
            </h3>
            <p className="text-4xl font-bold text-indigo-500">2,456</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2 dark:text-white">
              Total Products
            </h3>
            <p className="text-4xl font-bold text-indigo-500">348</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2 dark:text-white">
              Total Orders
            </h3>
            <p className="text-4xl font-bold text-indigo-500">1,823</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2 dark:text-white">Revenue</h3>
            <p className="text-4xl font-bold text-indigo-500">$156,342</p>
          </div>
        </div>
      </section>
    </div>
  );
}
