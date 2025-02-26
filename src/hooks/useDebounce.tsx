import { useState, useEffect } from "react";

/**
 * Handles a debounced value.
 * @param value The input.
 * @param delay The debounce time in milliseconds.
 * @returns The debounced value
 */
export default function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}