export const getLocaleFromPath = (pathname: string) => {
    const locale = pathname.split('/')[1];
    return locale;
};
