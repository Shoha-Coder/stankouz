"use client";

import React, { useLayoutEffect, useRef, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import "./scroll-stack.css";

export interface ScrollStackItemProps {
    itemClassName?: string;
    children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
    children,
    itemClassName = "",
}) => (
    <div className="scroll-stack-item">
        <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
    </div>
);

interface CardTransform {
    translateY: number;
    scale: number;
    rotation: number;
    blur: number;
}

interface ScrollStackProps {
    className?: string;
    children: ReactNode;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string;
    scaleEndPosition?: string;
    baseScale?: number;
    scaleDuration?: number;
    rotationAmount?: number;
    blurAmount?: number;
    /** Use window scroll (for sections in page flow). Default true for embedded use. */
    useWindowScroll?: boolean;
    onStackComplete?: () => void;
}

const getEffectiveStackDistance = (
    itemStackDistance: number,
    width?: number,
    height?: number
): number => {
    const w = width ?? (typeof window !== "undefined" ? window.innerWidth : 1024);
    const h = height ?? (typeof window !== "undefined" ? window.innerHeight : 800);
    if (w <= 480 || h <= 600) return Math.min(itemStackDistance, 16);
    if (w <= 640 || h <= 700) return Math.min(itemStackDistance, 20);
    if (w <= 768 || h <= 800) return Math.min(itemStackDistance, 24);
    if (w <= 1024 || h <= 900) return Math.min(itemStackDistance, 32);
    return itemStackDistance;
};

const getViewportHeight = (): number => {
    if (typeof window === "undefined") return 800;
    const h = window.visualViewport?.height ?? window.innerHeight;
    return Math.max(1, h); /* Avoid zero during resize/orientation */
};

const isTouchDevice = (): boolean => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const parsePercentage = (value: string | number, containerHeight: number): number => {
    if (typeof value === "string" && value.includes("%")) {
        return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(String(value)) || 0;
};

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    className = "",
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = "20%",
    scaleEndPosition = "10%",
    baseScale = 0.85,
    scaleDuration = 0.5,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = true,
    onStackComplete,
}) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const stackCompletedRef = useRef(false);
    const rafIdRef = useRef<number | null>(null);
    const lenisRef = useRef<Lenis | null>(null);
    const cardsRef = useRef<HTMLElement[]>([]);
    const effectiveStackDistanceRef = useRef(itemStackDistance);
    const lastTransformsRef = useRef<Map<number, CardTransform>>(new Map());
    const pendingUpdateRef = useRef(false);

    const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        const range = end - start;
        if (range <= 0) return 1;
        return (scrollTop - start) / range;
    }, []);

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: getViewportHeight(),
            };
        }
        const scroller = scrollerRef.current;
        if (!scroller) return null;
        const ch = scroller.clientHeight;
        return {
            scrollTop: scroller.scrollTop,
            containerHeight: Math.max(1, ch), /* Avoid zero during layout */
        };
    }, [useWindowScroll]);

    const getElementOffset = useCallback(
        (element: HTMLElement): number => {
            if (useWindowScroll) {
                const rect = element.getBoundingClientRect();
                return rect.top + window.scrollY;
            }
            const scroller = scrollerRef.current;
            if (!scroller) return 0;
            const scrollerRect = scroller.getBoundingClientRect();
            const elRect = element.getBoundingClientRect();
            return scroller.scrollTop + elRect.top - scrollerRect.top;
        },
        [useWindowScroll]
    );

    const updateCardTransforms = useCallback(() => {
        try {
            const cards = cardsRef.current;
            if (!cards.length) return;

            const scrollData = getScrollData();
            if (!scrollData) return;

        const { scrollTop, containerHeight } = scrollData;
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

        const container = useWindowScroll ? innerRef.current : scrollerRef.current;
        const endElement = container?.querySelector(".scroll-stack-end") as HTMLElement | undefined;
        const endElementTop = endElement ? getElementOffset(endElement) : 0;

        const stackDist = effectiveStackDistanceRef.current;

        cards.forEach((card, i) => {
            if (!card) return;

            const positionEl = card.parentElement?.classList.contains("scroll-stack-item")
                ? card.parentElement
                : card;
            const cardTop = getElementOffset(positionEl as HTMLElement);
            const triggerStart = cardTop - stackPositionPx - stackDist * i;
            const triggerEnd = cardTop - scaleEndPositionPx;
            const pinStart = cardTop - stackPositionPx - stackDist * i;
            const pinEnd = Math.max(pinStart, endElementTop - containerHeight / 2);

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + i * itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (blurAmount) {
                let topCardIndex = 0;
                for (let j = 0; j < cards.length; j++) {
                    const jCard = cards[j];
                    const jPosEl = jCard?.parentElement?.classList.contains("scroll-stack-item")
                        ? jCard.parentElement
                        : jCard;
                    const jCardTop = jPosEl ? getElementOffset(jPosEl as HTMLElement) : 0;
                    const jTriggerStart = jCardTop - stackPositionPx - stackDist * j;
                    if (scrollTop >= jTriggerStart) topCardIndex = j;
                }
                if (i < topCardIndex) {
                    blur = Math.max(0, (topCardIndex - i) * blurAmount);
                }
            }

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop + stackPositionPx + stackDist * i;
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + stackDist * i;
            }

            const newTransform: CardTransform = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(scale * 1000) / 1000,
                rotation: Math.round(rotation * 100) / 100,
                blur: Math.round(blur * 100) / 100,
            };

            const last = lastTransformsRef.current.get(i);
            const changed =
                !last ||
                Math.abs(last.translateY - newTransform.translateY) > 0.1 ||
                Math.abs(last.scale - newTransform.scale) > 0.001 ||
                Math.abs(last.rotation - newTransform.rotation) > 0.1 ||
                Math.abs(last.blur - newTransform.blur) > 0.1;

            if (changed) {
                card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";
                lastTransformsRef.current.set(i, newTransform);
            }

            if (i === cards.length - 1) {
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !stackCompletedRef.current) {
                    stackCompletedRef.current = true;
                    onStackComplete?.();
                } else if (!isInView) {
                    stackCompletedRef.current = false;
                }
            }
        });
        } finally {
            pendingUpdateRef.current = false;
        }
    }, [
        itemScale,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        calculateProgress,
        getScrollData,
        getElementOffset,
    ]);

    const scheduleUpdate = useCallback(() => {
        if (pendingUpdateRef.current) return;
        pendingUpdateRef.current = true;

        const run = () => {
            updateCardTransforms();
            rafIdRef.current = null;
        };

        rafIdRef.current = requestAnimationFrame(run);
    }, [updateCardTransforms]);

    const handleScroll = useCallback(() => {
        scheduleUpdate();
    }, [scheduleUpdate]);

    const updateItemMargins = useCallback(() => {
        const container = useWindowScroll ? innerRef.current : scrollerRef.current;
        if (!container) return;
        const items = Array.from(container.querySelectorAll(".scroll-stack-item")) as HTMLElement[];
        const w = typeof window !== "undefined" ? window.innerWidth : 1024;
        const effectiveItemDistance = w <= 640 ? Math.min(itemDistance, 60) : itemDistance;
        items.forEach((item, i) => {
            if (i < items.length - 1) {
                item.style.marginBottom = `${effectiveItemDistance}px`;
            }
        });
    }, [useWindowScroll, itemDistance]);

    useEffect(() => {
        const updateResponsive = () => {
            effectiveStackDistanceRef.current = getEffectiveStackDistance(itemStackDistance);
            updateItemMargins();
            scheduleUpdate();
        };
        updateResponsive();
        window.addEventListener("resize", updateResponsive);
        window.addEventListener("orientationchange", updateResponsive);
        const vv = typeof window !== "undefined" ? window.visualViewport : null;
        if (vv) {
            vv.addEventListener("resize", updateResponsive);
            vv.addEventListener("scroll", updateResponsive);
        }
        return () => {
            window.removeEventListener("resize", updateResponsive);
            window.removeEventListener("orientationchange", updateResponsive);
            if (vv) {
                vv.removeEventListener("resize", updateResponsive);
                vv.removeEventListener("scroll", updateResponsive);
            }
        };
    }, [itemStackDistance, scheduleUpdate, updateItemMargins]);

    useLayoutEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        effectiveStackDistanceRef.current = getEffectiveStackDistance(itemStackDistance);

        const container = useWindowScroll ? innerRef.current : scroller;
        const cards = container
            ? (Array.from(container.querySelectorAll(".scroll-stack-card")) as HTMLElement[])
            : [];

        cardsRef.current = cards;
        const lastTransforms = lastTransformsRef.current;

        updateItemMargins();

        cards.forEach((card) => {
            card.style.willChange = "transform";
            card.style.transformOrigin = "top center";
            card.style.backfaceVisibility = "hidden";
        });

        let cleanup: (() => void) | void;

        if (useWindowScroll) {
            window.addEventListener("scroll", handleScroll, { passive: true });

            cleanup = () => {
                window.removeEventListener("scroll", handleScroll);
                if (rafIdRef.current) {
                    cancelAnimationFrame(rafIdRef.current);
                    rafIdRef.current = null;
                }
            };
        } else {
            const content = scroller.querySelector(".scroll-stack-inner") as HTMLElement;
            if (!content) return;

            const touch = isTouchDevice();
            const w = window.innerWidth;
            const h = window.innerHeight;
            const isMobile = w <= 768 || h <= 800;

            const lenis = new Lenis({
                wrapper: scroller,
                content,
                duration: isMobile ? 0.8 : 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: touch && isMobile ? 1.5 : 2,
                infinite: false,
                gestureOrientation: "vertical",
                wheelMultiplier: 1,
                lerp: isMobile ? 0.15 : 0.1,
                syncTouch: touch && isMobile ? false : true,
                syncTouchLerp: 0.075,
            });

            lenis.on("scroll", handleScroll);
            lenisRef.current = lenis;

            const raf = (time: number) => {
                lenis.raf(time);
                rafIdRef.current = requestAnimationFrame(raf);
            };
            rafIdRef.current = requestAnimationFrame(raf);

            cleanup = () => {
                if (rafIdRef.current) {
                    cancelAnimationFrame(rafIdRef.current);
                    rafIdRef.current = null;
                }
                lenis.destroy();
                lenisRef.current = null;
            };
        }

        updateCardTransforms();

        return () => {
            cleanup?.();
            stackCompletedRef.current = false;
            cardsRef.current = [];
            lastTransforms.clear();
            pendingUpdateRef.current = false;
        };
    }, [
        itemDistance,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        handleScroll,
        updateCardTransforms,
        updateItemMargins,
    ]);

    return (
        <div
            className={`scroll-stack-scroller ${useWindowScroll ? "scroll-stack-window" : ""} ${className}`.trim()}
            ref={scrollerRef}
        >
            <div className="scroll-stack-inner" ref={innerRef}>
                {children}
                <div className="scroll-stack-end" aria-hidden />
            </div>
        </div>
    );
};

export default ScrollStack;
