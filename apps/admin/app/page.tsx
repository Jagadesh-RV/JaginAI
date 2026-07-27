export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
              <p className="mt-1 text-3xl font-semibold text-gray-900">42</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <h3 className="text-sm font-medium text-gray-500">System Health</h3>
              <p className="mt-1 text-3xl font-semibold text-green-600">Optimal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
