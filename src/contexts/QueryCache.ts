import { FNVHash } from "utils/FNVHash";

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

  hasQuery = (queryKey: string[]): boolean => {
    console.log(this.queries);
    const hashKey = this.hashQueryKey(queryKey);
    return this.queries.has(hashKey);
  };
}

export default QueryCache;
