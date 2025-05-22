'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AttachmentsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home or show a not found message
    router.push('/');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Page Not Available</h1>
        <p className="text-gray-600">The attachments page is not available in this version.</p>
        <p className="text-gray-600 mt-2">Redirecting to the home page...</p>
      </div>
    </div>
  );
}
