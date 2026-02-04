
export const handleLocaleChange = (newLocale: string, locale: string, pathname: string, router: any) => {
    if (newLocale === locale) return;

    const segments = pathname.split('/');
    segments[1] = newLocale;

    router.push(segments.join('/'));
}