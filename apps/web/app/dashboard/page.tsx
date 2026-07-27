import { Card, CardContent } from '@jagin/ui';
import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { FileText, Clock, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';

// This is a Server Component. It will fetch data from our API.
async function getDocuments() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('authjs.session-token') || cookieStore.get('__Secure-authjs.session-token');
    
    const res = await fetch('http://localhost:4000/documents', { 
      cache: 'no-store',
      headers: {
        Cookie: sessionToken ? `${sessionToken.name}=${sessionToken.value}` : '',
      }
    });
    
    if (!res.ok) throw new Error('Failed to fetch documents');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function DashboardPage() {
  const session = await auth();
  const documents = await getDocuments();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Greeting Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Welcome back, {session?.user?.name?.split(' ')[0] || 'User'} 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Here is what's happening in your workspace today.
        </p>
      </div>

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-gray-200/50 dark:border-gray-800/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                <FileText className="w-5 h-5" />
              </div>
              <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Documents</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{documents.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-gray-200/50 dark:border-gray-800/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Processing Jobs</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">3</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-gray-200/50 dark:border-gray-800/50 lg:col-span-2">
           <CardContent className="p-6 h-full flex flex-col justify-center">
             <div className="flex items-center justify-between mb-4">
               <h3 className="font-semibold text-gray-900 dark:text-white">System Status</h3>
               <span className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-inset ring-green-600/20">
                 <CheckCircle2 className="w-3 h-3 mr-1" /> All Systems Operational
               </span>
             </div>
             <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-2">
               <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
             </div>
             <p className="text-xs text-gray-500 dark:text-gray-400">Storage Capacity (45% used)</p>
           </CardContent>
        </Card>

      </div>

      {/* Recent Documents Feed */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200/50 dark:border-gray-800/50 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">View All</button>
        </div>
        <div className="p-0">
          {documents.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center">
              <AlertCircle className="w-8 h-8 text-gray-400 mb-3" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">No documents found</p>
              <p className="text-sm text-gray-400 mt-1">Upload a document to see it here.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-800/50">
              {documents.slice(0, 5).map((doc: any, i: number) => (
                <li 
                  key={doc.id} 
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors animate-in fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-gray-100">{doc.title}</span>
                      <span className="text-xs text-gray-500 font-mono">ID: {doc.id.split('-')[0]}...</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/20">
                    Processed
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
    </div>
  );
}
