export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div className="text-xl font-bold text-gray-900">Jagin AI</div>
        <nav className="space-x-4">
          <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
            Overview
          </a>
          <a href="/dashboard/settings" className="text-gray-600 hover:text-gray-900">
            Settings
          </a>
        </nav>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-white p-6 hidden md:block">
          <nav className="space-y-2">
            <a href="#" className="block rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
              Documents
            </a>
            <a href="#" className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Collections
            </a>
            <a href="#" className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Jobs
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
