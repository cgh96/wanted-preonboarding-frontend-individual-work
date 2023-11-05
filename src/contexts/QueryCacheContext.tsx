import { useContext, createContext } from "react";
import SingletoneQueryCache, { type QueryCache } from "./QueryCache";

const CacheContext = createContext<Readonly<QueryCache>>(SingletoneQueryCache);
export const useCache = () => useContext(CacheContext);

interface CacheProviderProps {
  children: React.ReactNode;
}

function CacheProvider({ children }: CacheProviderProps) {
  return (
    <CacheContext.Provider value={SingletoneQueryCache}>
      {children}
    </CacheContext.Provider>
  );
}

export default CacheProvider;
