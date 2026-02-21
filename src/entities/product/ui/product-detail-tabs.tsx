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

const FEATURES_LEFT_COUNT = 4;

function FeatureRow({ feature }: { feature: ProductDetail["features"][0] }) {
  return (
    <div className={styles.featureRow}>
      <span className={styles.featureLabel}>{feature.name}</span>
      <span className={styles.featureDots} aria-hidden />
      <span className={styles.featureValue}>{feature.value}</span>
    </div>
  );
}

function FeaturesContent({ features }: { features: ProductDetail["features"] }) {
  if (features.length === 0) return null;
  const leftFeatures = features.slice(0, FEATURES_LEFT_COUNT);
  const rightFeatures = features.slice(FEATURES_LEFT_COUNT);
  const hasRightColumn = rightFeatures.length > 0;
  return (
    <div
      className={`${styles.featuresContainer} ${!hasRightColumn ? styles.featuresContainerFull : ""}`}
    >
      <div className={styles.features}>
        {leftFeatures.map((feature, index) => (
          <FeatureRow key={index} feature={feature} />
        ))}
      </div>
      {hasRightColumn && (
        <div className={styles.features}>
          {rightFeatures.map((feature, index) => (
            <FeatureRow key={index} feature={feature} />
          ))}
        </div>
      )}
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
