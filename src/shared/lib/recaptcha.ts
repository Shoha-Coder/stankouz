/**
 * Google reCAPTCHA Integration Helper
 * 
 * To use this:
 * 1. Add the reCAPTCHA script to your _document.tsx or layout.tsx:
 *    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
 * 
 * 2. Get your site key from Google reCAPTCHA admin console
 * 
 * 3. Initialize reCAPTCHA in your component:
 *    import { initializeRecaptcha, renderRecaptcha } from '@/shared/lib/recaptcha';
 *    
 *    useEffect(() => {
 *      initializeRecaptcha('YOUR_SITE_KEY');
 *      renderRecaptcha('recaptcha-container', 'YOUR_SITE_KEY');
 *    }, []);
 * 
 * 4. Get the token before form submission:
 *    const token = window.grecaptcha?.getResponse();
 */

declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            render: (container: string | HTMLElement, options: {
                sitekey: string;
                theme?: 'light' | 'dark';
                size?: 'normal' | 'compact';
            }) => number;
            getResponse: (widgetId?: number) => string;
            reset: (widgetId?: number) => void;
            execute: (siteKey: string, options: {
                action: string;
            }) => Promise<string>;
        };
    }
}

let recaptchaLoaded = false;
let recaptchaWidgetId: number | null = null;

export const initializeRecaptcha = (siteKey: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (recaptchaLoaded && window.grecaptcha) {
            resolve();
            return;
        }

        if (window.grecaptcha) {
            window.grecaptcha.ready(() => {
                recaptchaLoaded = true;
                resolve();
            });
            return;
        }

        // If script is not loaded, wait a bit and check again
        const checkInterval = setInterval(() => {
            if (window.grecaptcha) {
                clearInterval(checkInterval);
                window.grecaptcha.ready(() => {
                    recaptchaLoaded = true;
                    resolve();
                });
            }
        }, 100);

        // Timeout after 10 seconds
        setTimeout(() => {
            clearInterval(checkInterval);
            if (!recaptchaLoaded) {
                reject(new Error('reCAPTCHA failed to load'));
            }
        }, 10000);
    });
};

export const renderRecaptcha = (
    containerId: string,
    siteKey: string,
    options?: {
        theme?: 'light' | 'dark';
        size?: 'normal' | 'compact';
    }
): number | null => {
    if (!window.grecaptcha) {
        console.error('reCAPTCHA is not loaded');
        return null;
    }

    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found`);
        return null;
    }

    try {
        recaptchaWidgetId = window.grecaptcha.render(container, {
            sitekey: siteKey,
            theme: options?.theme || 'light',
            size: options?.size || 'normal',
        });
        return recaptchaWidgetId;
    } catch (error) {
        console.error('Error rendering reCAPTCHA:', error);
        return null;
    }
};

export const getRecaptchaToken = (widgetId?: number): string | null => {
    if (!window.grecaptcha) {
        return null;
    }
    return window.grecaptcha.getResponse(widgetId || recaptchaWidgetId || undefined) || null;
};

export const resetRecaptcha = (widgetId?: number): void => {
    if (!window.grecaptcha) {
        return;
    }
    window.grecaptcha.reset(widgetId || recaptchaWidgetId || undefined);
};

