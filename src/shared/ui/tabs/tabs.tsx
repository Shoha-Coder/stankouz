"use client";

import { useState, useCallback, useEffect } from "react";
import styles from "./tabs.module.scss";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function Tabs({
  items,
  defaultActiveId,
  activeId,
  onChange,
  className,
}: TabsProps) {
  const initialId = defaultActiveId ?? items[0]?.id ?? "";
  const [internalActiveId, setInternalActiveId] = useState(initialId);

  const isControlled = activeId !== undefined;
  const currentActiveId = isControlled ? activeId : internalActiveId;

  const isValidId = items.some((item) => item.id === currentActiveId);

  useEffect(() => {
    if (!isValidId && items.length > 0 && !isControlled) {
      setInternalActiveId(items[0].id);
    }
  }, [items, currentActiveId, isValidId, isControlled]);

  const handleTabClick = useCallback(
    (id: string) => {
      if (!isControlled) {
        setInternalActiveId(id);
      }
      onChange?.(id);
    },
    [isControlled, onChange]
  );

  const activeContent = items.find((item) => item.id === currentActiveId)?.content;

  if (items.length === 0) return null;

  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      <div className={styles.tabList} role="tablist">
        {items.map((item) => {
          const isActive = item.id === currentActiveId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.id}`}
              id={`tab-${item.id}`}
              className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
              onClick={() => handleTabClick(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id={`tabpanel-${currentActiveId}`}
        role="tabpanel"
        aria-labelledby={`tab-${currentActiveId}`}
        className={styles.tabPanel}
      >
        {activeContent}
      </div>
    </div>
  );
}
