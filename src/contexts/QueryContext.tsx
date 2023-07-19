import { getStaleTime } from "utils/cacheTime";

import { useContext, createContext, useState } from "react";
import { useCache } from "./QueryCacheContext";

import type { QueryResponse, UseQueryParams } from "types/query";

interface QueryProviderProps {
  children: React.ReactNode;
}

const QueryStateContext = createContext<QueryResponse<any>>({
  data: null,
  error: null,
  loading: false,
  staleTime: new Date(),
});
const QueryDispatchContext = createContext<
  (({ queryFn, staleTime }: UseQueryParams<string>) => Promise<void>) | null
>(null);

export const useQueryDispatchContext = () => useContext(QueryDispatchContext);
export const useQueryStateContext = () => useContext(QueryStateContext);

function QueryProvider({ children }: QueryProviderProps) {
  const [data, setData] = useState<QueryResponse<any>>({
    data: null,
    loading: false,
    error: null,
    staleTime: new Date(),
  });

  const queryCache = useCache();

  const useQuery = async ({
    queryKey,
    queryFn,
    staleTime,
  }: UseQueryParams<any>): Promise<void> => {
    if (queryCache.hasValidQuery(queryKey)) {
      const queryData = queryCache.getQuery(queryKey);
      queryData && setData(queryData);
      return;
    }

    const STALE_TIME = staleTime ?? 1000 * 60;

    try {
      setData((prev) => ({
        ...prev,
        data: null,
        error: null,
        loading: true,
      }));

      const result = await queryFn(...queryKey);
      queryCache.addQuery(queryKey, {
        data: result,
        loading: false,
        staleTime: getStaleTime(STALE_TIME),
        error: null,
      });

      setData((prev) => ({
        ...prev,
        data: result,
        loading: false,
        staleTime: getStaleTime(STALE_TIME),
        error: null,
      }));
    } catch (e) {
      const error = e as Error;

      setData((prev) => ({
        ...prev,
        data: null,
        loading: false,
        error: error.message,
        staleTime: new Date(),
      }));
    }
  };

  return (
    <QueryStateContext.Provider value={data}>
      <QueryDispatchContext.Provider value={useQuery}>
        {children}
      </QueryDispatchContext.Provider>
    </QueryStateContext.Provider>
  );
}

export default QueryProvider;
