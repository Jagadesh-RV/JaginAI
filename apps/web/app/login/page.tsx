import { Button, Card, CardContent, Input } from '@jagin/ui';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Decorative background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="z-10 w-full max-w-md p-4">
        <Card glass className="border-t-white/40">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 mb-4 shadow-lg shadow-blue-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Sign in to <span className="text-gradient">Jagin AI</span>
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                Welcome back to the Enterprise AI Platform
              </p>
            </div>
            
            <form className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email address
                  </label>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="admin@jagin.ai"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <Button type="submit" className="w-full text-base h-11" variant="primary">
                  Sign In to Dashboard
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
