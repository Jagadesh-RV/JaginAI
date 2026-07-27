import { ThemeToggle } from '@jagin/ui';
import { auth } from '@/auth';
import { LogOut, Home, FileText, Settings, Layers, Search } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] dark:bg-[#020817] transition-colors duration-500">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200/50 dark:border-gray-800/50 bg-white/60 dark:bg-[#020817]/60 backdrop-blur-xl px-6">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">J</div>
            Jagin AI
          </Link>
          
          <div className="hidden md:flex items-center relative">
            <Search className="w-4 h-4 absolute left-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="pl-9 pr-4 py-1.5 w-64 bg-gray-100/50 dark:bg-gray-900/50 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 dark:text-gray-200 outline-none"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <ThemeToggle />
          {session?.user && (
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200 dark:border-gray-800">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">{session.user.name}</span>
                <span className="text-xs text-gray-500 mt-1">{session.user.email}</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white dark:ring-gray-900">
                {session.user.name?.charAt(0) || 'U'}
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 max-w-[1600px] w-full mx-auto">
        <aside className="w-64 p-6 hidden md:block">
          <nav className="space-y-1.5 sticky top-24">
            <Link href="/dashboard" className="flex items-center gap-3 rounded-xl bg-blue-50/80 dark:bg-blue-900/20 px-3 py-2.5 text-sm font-medium text-blue-700 dark:text-blue-400 transition-colors">
              <Home className="w-4 h-4" />
              Overview
            </Link>
            <Link href="/dashboard/documents" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              <FileText className="w-4 h-4" />
              Documents
            </Link>
            <Link href="/dashboard/collections" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              <Layers className="w-4 h-4" />
              Collections
            </Link>
            
            <div className="pt-8 pb-2">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">System</p>
            </div>
            
            <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <Link href="/api/auth/signout" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-auto">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Link>
          </nav>
        </aside>
        
        <main className="flex-1 p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
