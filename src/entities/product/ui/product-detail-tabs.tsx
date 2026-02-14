"use client";

import { Tabs } from "@/shared/ui/tabs";
import { ProductDetail } from "../model/types";
import styles from "./product-detail-tabs.module.scss";

const TAB_DESCRIPTION = "description";
const TAB_FEATURES = "features";

interface Props {
  product: ProductDetail;
}

function DescriptionContent({ text }: { text: string }) {
  const lines = text.split("\n").filter(Boolean);
  return (
    <ul className={styles.descriptionList}>
      {lines.map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  );
}

function FeaturesContent({ features }: { features: ProductDetail["features"] }) {
  if (features.length === 0) return null;
  return (
    <div className={styles.featuresContainer}>
      <div className={styles.features}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureRow}>
            <span className={styles.featureLabel}>{feature.name}</span>
            <span className={styles.featureDots} aria-hidden />
            <span className={styles.featureValue}>{feature.value}</span>
          </div>
        ))}
      </div>
      <div className={styles.features}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureRow}>
            <span className={styles.featureLabel}>{feature.name}</span>
            <span className={styles.featureDots} aria-hidden />
            <span className={styles.featureValue}>{feature.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductDetailTabs({ product }: Props) {
  const hasDescription = Boolean(product.description?.trim());
  const hasFeatures = (product.features?.length ?? 0) > 0;

  const tabItems = [
    ...(hasDescription
      ? [
        {
          id: TAB_DESCRIPTION,
          label: "Mahsulot tavsifi",
          content: <DescriptionContent text={product.description!} />,
        },
      ]
      : []),
    ...(hasFeatures
      ? [
        {
          id: TAB_FEATURES,
          label: "Xususiyatlari va hujjati",
          content: <FeaturesContent features={product.features!} />,
        },
      ]
      : []),
  ];

  if (tabItems.length === 0) return null;
  if (tabItems.length === 1) {
    return (
      <div className={styles.singleContent}>
        {tabItems[0].content}
      </div>
    );
  }

  return <Tabs items={tabItems} defaultActiveId={tabItems[0].id} />;
}
