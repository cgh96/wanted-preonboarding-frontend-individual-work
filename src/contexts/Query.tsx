import { useContext, createContext, useState } from "react";
import type { AxiosResponse } from "axios";
import type { QueryResponse } from "types/query";

interface QueryProviderProps {
  children: React.ReactNode;
}

interface UseQueryParams {
  queryKey: any[];
  queryFn: (params?: any) => Promise<AxiosResponse<any, any>>;
  staleTime: number | typeof Infinity;
}

const QueryStateContext = createContext<QueryResponse<any>>({
  data: null,
  loading: false,
  error: null,
  isStale: false,
});
const QueryDispatchContext = createContext<
  (({ queryFn, staleTime }: UseQueryParams) => Promise<void>) | null
>(null);

export const useQueryDispatchContext = () => useContext(QueryDispatchContext);
export const useQueryStateContext = () => useContext(QueryStateContext);

function QueryProvider({ children }: QueryProviderProps) {
  const [data, setData] = useState<QueryResponse<any>>({
    data: null,
    loading: false,
    error: null,
    isStale: false,
  });

  const useQuery = async ({
    queryKey,
    queryFn,
    staleTime,
  }: UseQueryParams): Promise<void> => {
    if (data.isStale) {
      return;
    }

    try {
      setData((prev) => ({ ...prev, loading: true }));
      const result = await queryFn(...queryKey);

      setData((prev) => ({
        ...prev,
        data: result,
        loading: false,
        error: null,
      }));
    } catch (e) {
      setData((prev) => ({ ...prev, data: null, loading: false, error: e }));
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
