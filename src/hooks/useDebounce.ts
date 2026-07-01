import { useState, useEffect } from "react";

/**
 * A custom hook that delays the update of a value until after a specified
 * delay (in milliseconds) has passed since the last time the value changed.
 * Useful for debouncing rapid events like keystrokes in a search input.
 */
export function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
