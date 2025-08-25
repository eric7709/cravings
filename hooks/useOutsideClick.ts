import { useEffect, useRef, RefObject, DependencyList } from 'react';
export const useClickOutside = <T extends HTMLElement = HTMLDivElement>(
  callback: (event: MouseEvent) => void,
  dependencies: DependencyList = []
): RefObject<T | null> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ...dependencies]);

  return ref;
};
