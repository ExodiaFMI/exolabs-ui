import { useMemo } from 'react';
import { Configuration } from '../codegen';
import useJWT from './useJWT';

const basePath: string = import.meta.env.VITE_API_URL;

export function useApiClient<T>(ApiClientClass: new (config: Configuration) => T): T {
  const { getToken } = useJWT();

  return useMemo(() => {
    const headers = { Authorization: `Bearer ${getToken()}` };
    const configuration = new Configuration({ basePath, headers });
    return new ApiClientClass(configuration);
  }, [ApiClientClass, getToken]);
}
