export default function Proizvodi() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Products</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <img
              src="/placeholder.svg"
              alt="Product Image"
              className="mb-4 w-full"
            />
            <h3 className="text-lg font-bold mb-2 dark:text-white">
              Product Name
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Product description goes here.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-indigo-500 font-bold">$49.99</span>
              <div className="flex space-x-2">
                <button className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500">
                  Edit
                </button>
                <button className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
