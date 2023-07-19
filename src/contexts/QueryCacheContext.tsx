import { useContext, createContext } from "react";
import QueryCache from "./QueryCache";

const CacheContext = createContext<QueryCache>(new QueryCache());
export const useCache = () => useContext(CacheContext);

interface CacheProviderProps {
  children: React.ReactNode;
}

function CacheProvider({ children }: CacheProviderProps) {
  const queryCache = new QueryCache();

  return (
    <CacheContext.Provider value={queryCache}>{children}</CacheContext.Provider>
  );
}

export default CacheProvider;
