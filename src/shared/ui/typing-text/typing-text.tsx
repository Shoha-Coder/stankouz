"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./typing-text.module.scss";

interface TypingTextProps {
  /** Text to type out (the part that was hidden) */
  text: string;
  /** Delay between characters in ms */
  speed?: number;
  /** Called when typing completes */
  onComplete?: () => void;
  /** Show blinking cursor while typing */
  showCursor?: boolean;
  className?: string;
}

export function TypingText({
  text,
  speed = 25,
  onComplete,
  showCursor = true,
  className = "",
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!text) {
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }
    setDisplayText("");
    setIsComplete(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setDisplayText(text);
        setIsComplete(true);
        clearInterval(timer);
        onCompleteRef.current?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && !isComplete && <span className={styles.cursor} aria-hidden />}
    </span>
  );
}
