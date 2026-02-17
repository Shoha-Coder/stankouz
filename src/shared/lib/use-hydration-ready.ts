"use client";

import { useEffect, useState } from "react";

/**
 * Returns true only after the component has mounted on the client.
 * Use this to defer Framer Motion's whileInView setup until after hydration,
 * fixing animations that don't trigger on first load / hard refresh.
 */
export function useHydrationReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Defer until after paint so Intersection Observer attaches correctly
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return ready;
}
