import { useEffect, useRef, useState, RefObject } from "react";

export function useOutsideClickToggle<T extends HTMLElement>() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<T>(null) as RefObject<T>;
  const lastClickInside = useRef(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;

      // If the click happened inside the dropdown, mark it
      if (ref.current && ref.current.contains(target)) {
        lastClickInside.current = true;
        return;
      }

      // Skip closing if the last click was inside (button click)
      if (lastClickInside.current) {
        lastClickInside.current = false;
        return;
      }

      close();
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen]); 

  return { ref, isOpen, open, close, toggle, setIsOpen };
}
