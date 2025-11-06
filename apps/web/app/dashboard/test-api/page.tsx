'use client';

import { useEffect, useState } from 'react';

export default function TestAPIPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/geo/sample')
      .then(r => r.json())
      .then(setData)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className="p-4 font-mono">
      <h1 className="text-xl font-bold mb-2">API Connection Test</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      <pre>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
    </div>
  );
}
