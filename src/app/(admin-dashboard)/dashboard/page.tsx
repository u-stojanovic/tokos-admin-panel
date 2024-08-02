export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Dashboard</h2>
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2 dark:text-white">
              Total Users
            </h3>
            <p className="text-4xl font-bold text-indigo-500">2,456</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2 dark:text-white">
              Total Products
            </h3>
            <p className="text-4xl font-bold text-indigo-500">348</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2 dark:text-white">
              Total Orders
            </h3>
            <p className="text-4xl font-bold text-indigo-500">1,823</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2 dark:text-white">Revenue</h3>
            <p className="text-4xl font-bold text-indigo-500">$156,342</p>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Users</h2>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="py-3 px-4 text-left dark:text-gray-400">Name</th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Email
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">Role</th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3 px-4 dark:text-gray-400">John Doe</td>
                <td className="py-3 px-4 dark:text-gray-400">
                  john.doe@example.com
                </td>
                <td className="py-3 px-4 dark:text-gray-400">Admin</td>
                <td className="py-3 px-4 dark:text-gray-400">
                  <div className="flex space-x-2">
                    <button className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500">
                      Edit
                    </button>
                    <button className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
