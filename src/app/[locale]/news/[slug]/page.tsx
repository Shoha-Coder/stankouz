"use client";

import { useParams } from "next/navigation";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { NewsArticleView } from "@/widgets/news-article/ui/news-article";
import { usePost, usePosts } from "@/entities/post";
import styles from "../news.module.scss";
import { useTranslations } from "next-intl";

export default function NewsDetailPage() {
    const params = useParams();
    const slug = params?.slug as string | undefined;
    const tBreadcrumb = useTranslations("breadcrumbs");
    const BREADCRUMB_ITEMS = [
        { label: tBreadcrumb("home"), href: "" },
        { label: tBreadcrumb("news"), href: "news" },
    ];
    const { data: post, isPending, isError } = usePost(slug);
    const { data: postsData } = usePosts({ page: 1 });
    const listPosts = postsData?.data ?? [];
    const currentInList = listPosts.find((p) => p.slug === slug);
    const sortByCreatedAt = <T extends { createdAt: string }>(a: T, b: T) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

    const navList =
        currentInList
            ? [...listPosts].sort(sortByCreatedAt)
            : post
              ? [post, ...listPosts].sort(sortByCreatedAt)
              : listPosts;
    const currentIndex = navList.findIndex((p) => p.slug === slug);
    const prevPost = currentIndex > 0 ? navList[currentIndex - 1] : null;
    const nextPost = currentIndex >= 0 && currentIndex < navList.length - 1 ? navList[currentIndex + 1] : null;
    const sidebarItems = listPosts
        .filter((p) => p.slug !== slug)
        .slice(0, 6)
        .map((p) => ({ id: p.id, title: p.title, date: p.date, slug: p.slug }));

    if (!slug) {
        return (
            <div className={styles.page}>
                <Breadcrumb items={BREADCRUMB_ITEMS} />
                <p style={{ padding: "2rem", textAlign: "center", color: "#6c6c6c" }}>
                    Yangilik topilmadi
                </p>
            </div>
        );
    }

    if (isPending && !post) {
        return (
            <div className={styles.page}>
                <Breadcrumb items={BREADCRUMB_ITEMS} />
                <p style={{ padding: "2rem", textAlign: "center", color: "#6c6c6c" }}>
                    Yuklanmoqda...
                </p>
            </div>
        );
    }

    if ((isError || !post) && !isPending) {
        return (
            <div className={styles.page}>
                <Breadcrumb items={BREADCRUMB_ITEMS} />
                <p style={{ padding: "2rem", textAlign: "center", color: "#c53030" }}>
                    Yangilik topilmadi
                </p>
            </div>
        );
    }

    const article = {
        id: post.id,
        title: post.title,
        date: post.date,
        image: post.image,
        imageSrcSet: post.imageSrcSet,
        imageSizes: post.imageSizes,
        content: post.content.length > 0 ? post.content : [post.description],
    };

    return (
        <div className={styles.page} key={slug}>
            <Breadcrumb items={BREADCRUMB_ITEMS} />
            <NewsArticleView
                article={article}
                sidebar={sidebarItems}
                prevArticle={prevPost ? { title: prevPost.title, slug: prevPost.slug } : null}
                nextArticle={nextPost ? { title: nextPost.title, slug: nextPost.slug } : null}
                currentSlug={slug}
            />
        </div>
    );
}
