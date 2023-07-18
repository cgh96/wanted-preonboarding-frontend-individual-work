import { useEffect } from "react";

export const useDebounce = (queryKey: any[], fn: () => void, time: number) => {
  useEffect(() => {
    const debounce = setTimeout(() => {
      fn();
    }, time);

    return () => {
      clearTimeout(debounce);
    };
  }, [...queryKey]);
};
