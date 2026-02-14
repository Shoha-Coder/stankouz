import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { NewsArticle, NewsItem } from "@/widgets/news-article/model/types";
import { NewsArticleView } from "@/widgets/news-article/ui/news-article";
import React from "react";

const items = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
];

const page = () => {
  const article: NewsArticle = {
    id: 1,
    title: "Hududiy tarmoqlararo savdo yarmarkasi bo‘lib o‘tdi",
    date: "29.01.2026",
    image: "/images/new3.png",
    content: [
      "Ish joyi haqida batafsil ma’lumotlar shu yerda yoziladi. Ish joyi haqida batafsil ma’lumotlar shu yerda yoziladi.",
      "Ish joyi haqida batafsil ma’lumotlar shu yerda yoziladi. Ish joyi haqida batafsil ma’lumotlar shu yerda yoziladi.",
      "Ish joyi haqida batafsil ma’lumotlar shu yerda yoziladi. Ish joyi haqida batafsil ma’lumotlar shu yerda yoziladi.",
    ],
    tags: ["#yangiliklar", "#toshkent", "#gidro"],
  };

  const sidebar: NewsItem[] = [
    {
      id: 2,
      title: "Hududiy tarmoqlararo savdo yarmarkasi bo‘lib o‘tdi",
      date: "02.02.2026",
      href: "/news/yarmarka-02",
    },
    {
      id: 3,
      title: "Hududiy tarmoqlararo savdo yarmarkasi bo‘lib o‘tdi",
      date: "01.02.2026",
      href: "/news/yarmarka-01",
    },
    {
      id: 4,
      title: "Hududiy tarmoqlararo savdo yarmarkasi bo‘lib o‘tdi",
      date: "31.01.2026",
      href: "/news/yarmarka-31",
    },
  ];

  return (
    <div>
      <Breadcrumb items={items} />
      <NewsArticleView article={article} sidebar={sidebar} />
    </div>
  );
};

export default page;
