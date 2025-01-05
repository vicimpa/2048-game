import { useEffect, useRef } from "react";

export const useWindowEvent = <K extends keyof WindowEventMap>(
  event: K,
  listener: (event: WindowEventMap[K]) => any
) => {
  const ref = useRef(listener);
  ref.current = listener;
  useEffect(() => {
    const ctrl = new AbortController();
    addEventListener(event, (e) => ref.current(e));
    return () => {
      ctrl.abort();
    };
  }, []);
};