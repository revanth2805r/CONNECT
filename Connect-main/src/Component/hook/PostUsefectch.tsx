// useFetch.ts

import { useState, useEffect } from 'react';

interface UseFetchProps {
  url: string;
  options?: RequestInit;
  method?: string;
  body?: object;
}

const puseFetch = ({ url, options = {}, method = 'GET', body }: UseFetchProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method,
          body: body ? JSON.stringify(body) : undefined,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          ...options,
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options, method, body]);

  return { data, loading, error };
};

export default puseFetch;
