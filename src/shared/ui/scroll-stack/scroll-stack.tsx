"use client";

import React, { useLayoutEffect, useRef, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import './scroll-stack.css';

export interface ScrollStackItemProps {
    itemClassName?: string;
    children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
    <div className="scroll-stack-item">
        <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
    </div>
);

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

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    scaleDuration = 0.5,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = true,
    onStackComplete
}) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef<number | null>(null);
    const lenisRef = useRef<Lenis | null>(null);
    const cardsRef = useRef<HTMLElement[]>([]);
    const effectiveStackDistanceRef = useRef(itemStackDistance);
    const lastTransformsRef = useRef(new Map<number, any>());
    const isUpdatingRef = useRef(false);

    const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        const range = end - start;
        if (range <= 0) return 1;
        return (scrollTop - start) / range;
    }, []);

    const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value as string);
    }, []);

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight,
                scrollContainer: document.documentElement
            };
        } else {
            const scroller = scrollerRef.current;
            return {
                scrollTop: scroller!.scrollTop,
                containerHeight: scroller!.clientHeight,
                scrollContainer: scroller!
            };
        }
    }, [useWindowScroll]);

    const getElementOffset = useCallback(
        (element: HTMLElement) => {
            if (useWindowScroll) {
                const rect = element.getBoundingClientRect();
                return rect.top + window.scrollY;
            } else {
                const scroller = scrollerRef.current;
                if (!scroller) return 0;
                const scrollerRect = scroller.getBoundingClientRect();
                const elRect = element.getBoundingClientRect();
                return scroller.scrollTop + elRect.top - scrollerRect.top;
            }
        },
        [useWindowScroll]
    );

    const updateCardTransforms = useCallback(() => {
        if (!cardsRef.current.length || isUpdatingRef.current) return;

        isUpdatingRef.current = true;

        const { scrollTop, containerHeight } = getScrollData();
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

        const container = useWindowScroll ? innerRef.current : scrollerRef.current;
        const endElement = container?.querySelector('.scroll-stack-end') as HTMLElement | undefined;

        const endElementTop = endElement ? getElementOffset(endElement) : 0;

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const positionEl = card.parentElement?.classList.contains('scroll-stack-item')
                ? card.parentElement
                : card;
            const cardTop = getElementOffset(positionEl);
            const stackDist = effectiveStackDistanceRef.current;
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
                for (let j = 0; j < cardsRef.current.length; j++) {
                    const jCard = cardsRef.current[j];
                    const jPosEl = jCard?.parentElement?.classList.contains('scroll-stack-item')
                        ? jCard.parentElement
                        : jCard;
                    const jCardTop = jPosEl ? getElementOffset(jPosEl as HTMLElement) : 0;
                    const jTriggerStart = jCardTop - stackPositionPx - effectiveStackDistanceRef.current * j;
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }

                if (i < topCardIndex) {
                    const depthInStack = topCardIndex - i;
                    blur = Math.max(0, depthInStack * blurAmount);
                }
            }

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop + stackPositionPx + stackDist * i;
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + stackDist * i;
            }

            const newTransform = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(scale * 1000) / 1000,
                rotation: Math.round(rotation * 100) / 100,
                blur: Math.round(blur * 100) / 100
            };

            const lastTransform = lastTransformsRef.current.get(i);
            const hasChanged =
                !lastTransform ||
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

            if (hasChanged) {
                const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

                card.style.transform = transform;
                card.style.filter = filter;

                lastTransformsRef.current.set(i, newTransform);
            }

            if (i === cardsRef.current.length - 1) {
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !stackCompletedRef.current) {
                    stackCompletedRef.current = true;
                    onStackComplete?.();
                } else if (!isInView && stackCompletedRef.current) {
                    stackCompletedRef.current = false;
                }
            }
        });

        isUpdatingRef.current = false;
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
        parsePercentage,
        getScrollData,
        getElementOffset
    ]);

    useEffect(() => {
        const updateResponsive = () => {
            const h = typeof window !== 'undefined' ? window.innerHeight : 800;
            const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
            if (w <= 640 || h <= 700) {
                effectiveStackDistanceRef.current = Math.min(itemStackDistance, 24);
            } else if (w <= 1024 || h <= 800) {
                effectiveStackDistanceRef.current = Math.min(itemStackDistance, 40);
            } else {
                effectiveStackDistanceRef.current = itemStackDistance;
            }
        };
        updateResponsive();
        window.addEventListener('resize', updateResponsive);
        return () => window.removeEventListener('resize', updateResponsive);
    }, [itemStackDistance]);

    const handleScroll = useCallback(() => {
        updateCardTransforms();
    }, [updateCardTransforms]);

    const setupScroll = useCallback((): (() => void) | void => {
        if (useWindowScroll) {
            const raf = () => {
                updateCardTransforms();
                animationFrameRef.current = requestAnimationFrame(raf);
            };
            animationFrameRef.current = requestAnimationFrame(raf);
            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
                window.removeEventListener('scroll', handleScroll);
            };
        } else {
            const scroller = scrollerRef.current;
            if (!scroller) return;

            const lenis = new Lenis({
                wrapper: scroller,
                content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
                duration: 1.2,
                easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: 2,
                infinite: false,
                gestureOrientation: 'vertical',
                wheelMultiplier: 1,
                lerp: 0.1,
                syncTouch: true,
                syncTouchLerp: 0.075
            });

            lenis.on('scroll', handleScroll);

            const raf = (time: number) => {
                lenis.raf(time);
                animationFrameRef.current = requestAnimationFrame(raf);
            };
            animationFrameRef.current = requestAnimationFrame(raf);

            lenisRef.current = lenis;
        }
    }, [handleScroll, useWindowScroll, updateCardTransforms]);

    useLayoutEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        if (typeof window !== 'undefined') {
            const h = window.innerHeight;
            const w = window.innerWidth;
            if (w <= 640 || h <= 700) {
                effectiveStackDistanceRef.current = Math.min(itemStackDistance, 24);
            } else if (w <= 1024 || h <= 800) {
                effectiveStackDistanceRef.current = Math.min(itemStackDistance, 40);
            } else {
                effectiveStackDistanceRef.current = itemStackDistance;
            }
        } else {
            effectiveStackDistanceRef.current = itemStackDistance;
        }
        const container = useWindowScroll ? innerRef.current : scroller;
        const cards = container
            ? (Array.from(container.querySelectorAll('.scroll-stack-card')) as HTMLElement[])
            : [];
        const items = container
            ? (Array.from(container.querySelectorAll('.scroll-stack-item')) as HTMLElement[])
            : [];

        cardsRef.current = cards;
        const transformsCache = lastTransformsRef.current;

        items.forEach((item, i) => {
            if (i < items.length - 1) {
                item.style.marginBottom = `${itemDistance}px`;
            }
        });

        cards.forEach((card) => {
            card.style.willChange = 'transform';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
        });

        const removeScrollSetup = setupScroll();

        updateCardTransforms();

        return () => {
            if (typeof removeScrollSetup === 'function') {
                removeScrollSetup();
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
            stackCompletedRef.current = false;
            cardsRef.current = [];
            transformsCache.clear();
            isUpdatingRef.current = false;
        };
    }, [
        itemDistance,
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        scaleDuration,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        setupScroll,
        updateCardTransforms
    ]);

    return (
        <div
            className={`scroll-stack-scroller ${useWindowScroll ? 'scroll-stack-window' : ''} ${className}`.trim()}
            ref={scrollerRef}
        >
            <div className="scroll-stack-inner" ref={innerRef}>
                {children}
                {/* Spacer so the last pin can release cleanly */}
                <div className="scroll-stack-end" />
            </div>
        </div>
    );
};

export default ScrollStack;
