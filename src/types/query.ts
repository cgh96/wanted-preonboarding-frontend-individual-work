export interface QueryResponse<T> {
  data?: T | null;
  loading?: boolean;
  error?: unknown | null;
  isStale?: boolean;
}
