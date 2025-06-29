import { useEffect, useRef } from "react";

export default function useAutoSaveDraft(key, data, delay = 1000) {
  const timeoutRef = useRef();

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(data));
    }, delay);
    return () => clearTimeout(timeoutRef.current);
  }, [data, key, delay]);
}