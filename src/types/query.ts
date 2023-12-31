import type { AxiosResponse } from "axios";

export interface QueryResponse<T> {
  data: T | null;
  loading?: boolean;
  error: unknown | null;
  staleTime: Date;
}

export interface UseQueryParams<T> {
  queryKey: T[];
  queryFn: (params?: any) => Promise<AxiosResponse<any, any>>;
  staleTime?: number;
}
