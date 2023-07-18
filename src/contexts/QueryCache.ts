import { FNVHash } from "utils/FNVHash";
import { isStaled } from "utils/cacheTime";

import type { QueryResponse } from "types/query";

class QueryCache {
  private readonly queries = new Map<any, QueryResponse<any>>();
  private readonly hashQueryKey = (queryKey: any[]) => {
    let hash = 0;

    for (const key of queryKey) {
      const val = FNVHash(JSON.stringify(key));
      hash += val;
    }

    return hash;
  };

  addQuery = (queryKey: any[], query: QueryResponse<any>) => {
    const hashKey = this.hashQueryKey(queryKey);
    this.queries.set(hashKey, query);
  };

  removeQuery = (queryKey: string[]) => {
    const hashKey = this.hashQueryKey(queryKey);

    this.queries.delete(hashKey);
  };

  getQuery = (queryKey: string[]) => {
    const hashKey = this.hashQueryKey(queryKey);
    return this.queries.get(hashKey);
  };

  hasValidQuery = (queryKey: string[]): boolean => {
    const hashKey = this.hashQueryKey(queryKey);
    const data = this.queries.get(hashKey);
    if (data) {
      return !isStaled(data.staleTime);
    }

    return false;
  };
}

export default QueryCache;
