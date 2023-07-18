import { getStaleTime } from "utils/cacheTime";

import { useContext, createContext, useState } from "react";

import QueryCache from "./QueryCache";

import type { QueryResponse, UseQueryParams } from "types/query";

interface SickProviderProps {
  children: React.ReactNode;
}

const SickStateContext = createContext<QueryResponse<any>>({
  data: null,
  error: null,
  loading: false,
  staleTime: new Date(),
});
const SickDispatchContext = createContext<
  (({ queryFn, staleTime }: UseQueryParams<string>) => Promise<void>) | null
>(null);

export const useSickDispatchContext = () => useContext(SickDispatchContext);
export const useSickStateContext = () => useContext(SickStateContext);

const queryCache = new QueryCache();

function SickProvider({ children }: SickProviderProps) {
  const [data, setData] = useState<QueryResponse<any>>({
    data: null,
    loading: false,
    error: false,
    staleTime: new Date(),
  });

  const useQuery = async ({
    queryKey,
    queryFn,
    staleTime,
  }: UseQueryParams<string>): Promise<void> => {
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
      setData((prev) => ({
        ...prev,
        data: null,
        loading: false,
        error: e,
        staleTime: new Date(),
      }));
    }
  };

  return (
    <SickStateContext.Provider value={data}>
      <SickDispatchContext.Provider value={useQuery}>
        {children}
      </SickDispatchContext.Provider>
    </SickStateContext.Provider>
  );
}

export default SickProvider;
