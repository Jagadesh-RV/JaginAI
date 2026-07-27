import { Card, CardContent, CardHeader, CardTitle } from '@jagin/ui';

// This is a Server Component. It will fetch data from our API.
async function getDocuments() {
  try {
    const res = await fetch('http://localhost:4000/documents', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch documents');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function DashboardPage() {
  const documents = await getDocuments();

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Here is the latest activity across your workspace.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="flex items-center p-6">
            <div className="inline-flex p-3 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Documents</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{documents.length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Documents (Live from API)</CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No documents found. Upload one to get started.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {documents.map((doc: any) => (
                <li key={doc.id} className="py-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-gray-100">{doc.title}</span>
                    <span className="text-sm text-gray-500">ID: {doc.id}</span>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Processed
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
