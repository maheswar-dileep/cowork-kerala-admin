'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
            <span className="text-6xl font-bold text-gray-400">404</span>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Page Not Found
        </h1>
        <p className="mb-8 text-gray-600">
          Sorry, we couldn`t find the page you`re looking for. The URL might be
          incorrect.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Link href="/">
            <Button className="flex w-full items-center gap-2 bg-green-600 hover:bg-green-700 sm:w-auto">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-sm text-gray-500">
          <p>Need help? Contact support.</p>
        </div>
      </div>
    </div>
  );
}
